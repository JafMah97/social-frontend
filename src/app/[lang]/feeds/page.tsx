import CreatePost from "@/components/layout/website/feeds/create-post/create-post";
import Posts from "@/components/layout/website/feeds/posts/posts";

export default async function FeedsPage() {
  return (
    <div className="home-image bg-fixed">
      <div className="backdrop-blur-xl bg-background/40">
        <div className="container max-w-5xl mx-auto">
          <div className=" min-h-screen overflow-visible py-4 m-4 mt-0 mb-0">
            {/* Main content */}
            <div className="bg-background rounded-xl">
              <div className=" mt-0 bg-primary/10 rounded-xl p-4">
                <CreatePost />
                <div>
                  <div className=" rounded-xl mt-4">
                    <Posts />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
