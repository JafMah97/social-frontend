
//this is main layout for future use
import { OverlayDiv } from "@/components/layout/custom/custom-divs";

export default function Page() {
  return (
    <div className="container max-w-7xl mx-auto">
      <OverlayDiv
        className="grid grid-cols-1 lg:grid-cols-12 min-h-screen overflow-visible pt-4"
        rounded="rounded-none"
      >
        {/* Sticky left sidebar */}
        {/*TODO: Hidden for Know */}
        <OverlayDiv className="m-4 mt-0 lg:col-span-3 height-custom-m sticky top-20">
          <OverlayDiv className="p-4 m-4 height-custom-40">
            {/* <ProfileOverview/> */}
          </OverlayDiv>
          <OverlayDiv className="p-4 m-4 height-custom-60">setting</OverlayDiv>
        </OverlayDiv>

        {/* Main content */}
        <OverlayDiv className="m-4 mt-0 col-span-1 lg:col-span-6">
          <OverlayDiv className="p-4 m-4 h-40">create a post</OverlayDiv>
          <div>
            <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
            <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
            <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
            <OverlayDiv className="p-4 m-4 h-[600px]"> a post</OverlayDiv>
          </div>
        </OverlayDiv>

        {/* Right column */}
        {/* TODO:Hidden for know */}
        <OverlayDiv className="m-4 mt-0 lg:col-span-3 height-custom-m sticky top-20">
          <OverlayDiv className="p-4 m-4 height-custom-40">profile</OverlayDiv>
          <OverlayDiv className="p-4 m-4 height-custom-60">setting</OverlayDiv>
        </OverlayDiv>
      </OverlayDiv>
    </div>
  );
}
