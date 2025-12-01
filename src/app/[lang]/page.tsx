import { Button } from "@/components/ui/button";
import Link from "next/link";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function HomePage() {
     await sleep(10000);
  return (
    <div className=" flex flex-col  bg-primary/10 ">
      <div className="bg-background/50 backdrop-blur-md">
        {/* Hero Section with Background */}
        <section className="flex-1 flex items-center justify-center py-16 md:py-24 px-4 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="absolute inset-0 opacity-5 bg-[radial-linear(circle_at_50%_50%,var(--primary),transparent_70%)]" />
          </div>

          {/* Content */}
          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Main Headline */}
              <div className="mb-8 md:mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                  Connect, Share,{" "}
                  <span className="relative">
                    <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Inspire
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-primary to-primary/50 rounded-full" />
                  </span>
                </h1>
                <div className="h-1 w-24 mx-auto bg-linear-to-r from-primary/50 to-transparent rounded-full mt-6" />
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground mb-10 md:mb-14 leading-relaxed max-w-2xl mx-auto">
                Join millions of people sharing their stories, building
                communities, and making meaningful connections on Konekta.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button
                  asChild
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-primary/25 group"
                >
                  <Link
                    href="/auth/register"
                    className="flex items-center gap-2"
                  >
                    Get Started Free
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 hover:bg-accent/50 hover:border-accent transition-all duration-300 hover:scale-105"
                >
                  <Link href="/demo">Watch Demo</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <StatItem value="2M+" label="Active Users" />
                <StatItem value="50K+" label="Communities" />
                <StatItem value="99.9%" label="Uptime" />
                <StatItem value="24/7" label="Support" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Stat Item Component
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-4">
      <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
        {value}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
}
