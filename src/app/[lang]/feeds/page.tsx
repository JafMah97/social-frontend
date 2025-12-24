import { OverlayDiv } from "@/components/layout/custom/custom-divs";
import CreatePost from "@/components/layout/website/feeds/create-post/create-post";
import PostCard from "@/components/layout/website/feeds/posts/post-card";

export default async function FeedsPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

  return (
    <div className="home-image">
      <div className="backdrop-blur-xl bg-background/40">
        <div className="container max-w-5xl mx-auto">
          <div className=" min-h-screen overflow-visible pt-4 ">
            {/* Main content */}
            <div className="bg-background rounded-xl">
              <div className=" mt-0 bg-primary/10 rounded-xl p-4">
                <CreatePost />
                <div>
                  <div className="bg-primary/10 rounded-xl mt-4">
                    <PostCard />
                  </div>
                  <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
                  <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
                  <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
