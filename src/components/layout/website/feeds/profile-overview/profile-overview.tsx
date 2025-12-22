// "use client";
// import { Button } from "@/components/ui/button";
// import { UserRound, Users } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import ProfileOverviewSkeleton from "./profile-overflow-skeleton";

// export default function ProfileOverview() {

//   if (isLoading) return <ProfileOverviewSkeleton />;

//   return (
//     <div className="flex flex-col justify-center items-center h-full">
//       {isError ? (
//         <div className="flex flex-col items-center justify-center h-full w-full border-2 border-dotted border-neutral-400 rounded-lg p-4 text-center space-y-2 bg-white/10 dark:bg-black/30 backdrop-blur-xl max-w-xs mx-auto">
//           <UserRound className="p-1 text-neutral-800 text-xs bg-neutral-500/30 dark:text-neutral-300 w-10 h-10 rounded-full" />
//           <h3 className="text-base font-semibold text-black dark:text-white">
//             You&#39;re not logged in
//           </h3>
//           <p className="text-xs text-neutral-800 dark:text-neutral-300">
//             Log in to view your profile, posts, and notifications.
//           </p>
//           <Link href="/auth/login" className="w-full">
//             <Button aria-label="login" className="bg-grad btn-style w-full">
//               Login
//             </Button>
//           </Link>
//         </div>
//       ) : (
//         <div className="w-full h-full flex flex-col justify-start items-center">
//           <div className="w-full flex flex-col items-center justify-start relative">
//             {data?.user.cover_image && (
//               <Image
//                 src={data.user.cover_image}
//                 alt="cover"
//                 width={1000}
//                 height={300}
//                 className="w-full h-32 rounded-lg outline outline-neutral-500"
//               />
//             )}
//             {data?.user.profile_image && (
//               <Image
//                 src={data.user.profile_image}
//                 alt="profile"
//                 width={150}
//                 height={150}
//                 className="w-16 h-16 rounded-full absolute -bottom-1/4"
//               />
//             )}
//           </div>
//           <h3 className="mt-8 text-sm text-neutral-800 dark:text-neutral-300">
//             @{data?.user.username}
//           </h3>
//           <h2 className="font-bold">{data?.user.full_name}</h2>
//           <div className="flex flex-col xl:flex-row justify-around w-full px-2">
//             <Link
//               href={`/user/${data?.user.username}/followers`}
//               className="group"
//             >
//               <div className="flex flex-row justify-center items-center space-x-1 p-1 m-1 rounded-lg transition">
//                 <Users className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:scale-105 transition-transform" />
//                 <span className="text-[10px] font-medium text-neutral-800 dark:text-neutral-200">
//                   {data?.user.followers_count}
//                 </span>
//                 <span className="text-[10px]">Followers</span>
//               </div>
//             </Link>
//             <Link
//               href={`/user/${data?.user.username}/following`}
//               className="group"
//             >
//               <div className="flex flex-row justify-center items-center space-x-1 p-1 m-1 rounded-lg transition">
//                 <UserRound className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:scale-105 transition-transform" />
//                 <span className="text-[10px] font-medium text-neutral-800 dark:text-neutral-200">
//                   {data?.user.following_count}
//                 </span>
//                 <span className="text-[10px]">Following</span>
//               </div>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
