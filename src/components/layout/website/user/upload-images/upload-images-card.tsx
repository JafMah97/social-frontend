"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Wave from "@/components/layout/website/home/svgs/wave";
import UploadAvatar from "@/components/layout/website/user/upload-images/upload-avatar";
import UploadCover from "@/components/layout/website/user/upload-images/upload-cover";
import Link from "next/link";
import { useTranslation } from "@/providers/translation-provider";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Lang } from "@/utils/translation/dictionary-utils";
import { useUploadAvatar, useUploadCover } from "@/hooks/api-hooks/user/user-hooks";

export default function UploadImagesCard({
  children,
  lang,
}: {
  children?: React.ReactNode;
  lang: Lang;
}) {
  const dict = useTranslation().uploadImagesPage;
  const router = useRouter();

  const [error, setError] = useState({
    cover: "",
    avatar: "",
  });

  const [success, setSuccess] = useState({
    cover: false,
    avatar: false,
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { mutateAsync: uploadCover, isPending: isUploadingCover } =
    useUploadCover({
      onSuccess: () => {
        setSuccess((prev) => ({ ...prev, cover: true }));
        setError((prev) => ({ ...prev, cover: "" }));
        toast.success(dict.cover.toast.successCover);
      },
      onError: (err) => {
        setError((prev) => ({ ...prev, cover: err.error.message }));
        toast.error(dict.cover.toast.errorCover);
      },
    });

  const { mutateAsync: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar({
      onSuccess: () => {
        setSuccess((prev) => ({ ...prev, avatar: true }));
        setError((prev) => ({ ...prev, avatar: "" }));
        toast.success(dict.avatar.toast.successAvatar);
      },
      onError: (err) => {
        setError((prev) => ({ ...prev, avatar: err.error.message }));
        toast.error(dict.avatar.toast.errorAvatar);
      },
    });

  const handleClick = async () => {
    if (!coverFile) {
      setError((prev) => ({ ...prev, cover: dict.cover.toast.noFileCover }));
      toast.warning(dict.cover.toast.noFileCover);
      return;
    } else {
      setError((prev) => ({ ...prev, cover: "" }));
    }

    if (!avatarFile) {
      setError((prev) => ({ ...prev, avatar: dict.avatar.toast.noFileAvatar }));
      toast.warning(dict.avatar.toast.noFileAvatar);
      return;
    } else {
      setError((prev) => ({ ...prev, avatar: "" }));
    }

    await uploadCover(coverFile);
    await uploadAvatar(avatarFile);
  };

  useEffect(() => {
    if (success.avatar && success.cover) {
      router.push(`/${lang}/user/complete-profile`);
    }
  }, [success.cover, success.avatar, lang, router]);

  return (
    <Card className="bg-primary/10 relative overflow-hidden z-50 py-15 w-full gap-0">
      <Wave up className="absolute top-0 w-[1000px] z-10" />

      <CardHeader className="flex flex-col gap-2 items-start justify-center relative z-50">
        {children}
        <div>
          <CardTitle className="py-4">{dict.title}</CardTitle>
          <CardDescription>{dict.description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <UploadCover setCover={setCoverFile} />
        <UploadAvatar setAvatar={setAvatarFile} />
      </CardContent>

      <CardFooter className="flex justify-between gap-4 relative z-50">
        <div>
          <p className="text-red-500 h-4 text-xs">{error.avatar} </p>
          <p className="text-red-500 h-4 text-xs">{error.cover}</p>
        </div>
        <div>
          <Button variant="outline" className="cursor-pointer mx-2" asChild>
            <Link href={`/${lang}/user/complete-profile`}>{dict.skip}</Link>
          </Button>

          <Button
            className="cursor-pointer mx-2"
            onClick={handleClick}
            disabled={isUploadingCover || isUploadingAvatar}
          >
            {isUploadingAvatar || isUploadingCover ? (
              <Spinner />
            ) : (
              dict.continue
            )}
          </Button>
        </div>
      </CardFooter>

      <Wave className="absolute -bottom-1 w-[1000px] z-30" />
    </Card>
  );
}
