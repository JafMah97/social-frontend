import { OverlayDiv } from "@/components/layout/custom/custom-divs";
import CreatePost from "@/components/layout/website/feeds/create-post/create-post";
import PostCard from "@/components/layout/website/feeds/posts/post-card";

export default function FeedsPage() {
  return (
    <div className="container max-w-5xl mx-auto">
      <OverlayDiv
        className=" min-h-screen overflow-visible pt-4"
        rounded="rounded-none"
      >
        {/* Main content */}
        <OverlayDiv className="m-4 mt-0">
          <OverlayDiv className="p-4 m-4"><CreatePost/></OverlayDiv>
          <div>
            <OverlayDiv className="m-4 py-4"><PostCard/></OverlayDiv>
            <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
            <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
            <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
          </div>
        </OverlayDiv>
      </OverlayDiv>
    </div>
  );
}
