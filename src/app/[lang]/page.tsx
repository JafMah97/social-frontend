import FeatureCard from "@/components/layout/website/home/features/feature-card";
import HeroCarousel from "@/components/layout/website/home/hero/hero-carousel";
import StatItem from "@/components/layout/website/home/hero/stat-item";
import Wave from "@/components/layout/website/home/svgs/wave";
import { Button } from "@/components/ui/button";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import { fmt } from "@/utils/translation/language-utils";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const { mainPage: dict, siteName } = await getDictionary(lang);
  return (
    <div className="flex flex-col bg-primary/10">
      {/* Hero Section with Background */}

      {/* Hero Section */}
      <HeroCarousel
        images={["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"]}
      >
        <div className="container max-w-4xl text-center text-white space-y-8 mx-2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg text-shadow-xs text-shadow-black">
            {dict.hero.headline.connect}, {dict.hero.headline.share},{" "}
            <span className="text-primary text-shadow-2xs text-shadow-white">
              {dict.hero.headline.inspire}
            </span>
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-200 text-shadow-xs text-shadow-black">
            {fmt(dict.hero.subtitle, { siteName })}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="px-6 py-3 text-lg font-semibold bg-background hover:bg-background/90 text-primary transition-transform transform hover:scale-105 shadow-lg"
            >
              <Link href={`/${lang}/auth/login`}>{dict.hero.cta.login}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="px-6 py-3 text-shadow-2xs text-shadow-black text-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-transform transform hover:scale-105 shadow-xl"
            >
              <Link href={`/${lang}/auth/register`}>
                {dict.hero.cta.getStarted}
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center md:gap-8 mt-10">
            <StatItem
              value={dict.hero.stats.activeUsers.value}
              label={dict.hero.stats.activeUsers.label}
            />
            <StatItem
              value={dict.hero.stats.communities.value}
              label={dict.hero.stats.communities.label}
            />
            <StatItem
              value={dict.hero.stats.uptime.value}
              label={dict.hero.stats.uptime.label}
            />
            <StatItem
              value={dict.hero.stats.support.value}
              label={dict.hero.stats.support.label}
            />
          </div>
        </div>
      </HeroCarousel>

      {/* Features Section */}
      <div className="bg-background border-t-background border-b-background -my-1">
        <div className="relative w-full overflow-hidden leading-none bg-primary/10">
          <Wave up className="w-full h-auto " />
        </div>
        <section className="px-6 md:px-12 bg-primary/10 py-20 relative">
          <div className="max-w-6xl mx-auto text-center relative z-30">
            {/* Section Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {fmt(dict.hero.features.title, { siteName: siteName })}
            </h2>
            <p className="text-lg md:text-xl text-accent-foreground max-w-3xl mx-auto mb-16 leading-snug">
              {dict.hero.features.subtitle}
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon="🌍"
                title={dict.hero.features.globalReach.title}
                description={dict.hero.features.globalReach.description}
              />
              <FeatureCard
                icon="🤝"
                title={dict.hero.features.community.title}
                description={dict.hero.features.community.description}
              />
              <FeatureCard
                icon="⚡"
                title={dict.hero.features.performance.title}
                description={dict.hero.features.performance.description}
              />
            </div>
          </div>
        </section>
        <div className="relative w-full overflow-hidden leading-none bg-primary/10">
          <Wave className="w-full h-auto " />
        </div>
      </div>
    </div>
  );
}
