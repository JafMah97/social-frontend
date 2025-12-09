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
      <div className="home-image ">
        <section className="flex-1 custom-height flex items-start justify-center py-24 px-4 relative height-custom dark:bg-background/50 backdrop-blur-md shadow-2xl">
          {/* Content */}
          <div className="container max-w-6xl mx-auto relative z-10 rounded-xl">
            <div className="text-center max-w-3xl mx-auto">
              {/* Main Headline */}
              <div className="mb-12">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
                  {dict.hero.headline.connect}, {dict.hero.headline.share},{" "}
                  <span className="relative">
                    <span className="text-primary">
                      {dict.hero.headline.inspire}
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-primary to-primary/50 rounded-full" />
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg leading-5 md:leading-relaxed md:text-xl text-white rounded-2xl mb-10 md:mb-14 px-5 max-w-2xl mx-auto">
                {fmt(dict.hero.subtitle, { siteName: siteName })}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row gap-4 justify-center items-center mb-16">
                <Button
                  asChild
                  size="lg"
                  className="p-6 bg-primary/10 text-white text-lg font-semibold border-2 hover:bg-accent/50 hover:border-accent transition-all duration-300 hover:scale-105"
                >
                  <Link href={`${lang}/auth/login`}>
                    {dict.hero.cta.login}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="p-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-primary/25 group"
                >
                  <Link href={`${lang}/auth/register`}>
                    {dict.hero.cta.getStarted}
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="max-w-2xl mx-auto flex flex-row justify-center md:gap-4">
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
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div className="bg-background border-t-2 border-b-2 border-t-background border-b-background shadow-2xl">
        <svg
          className="bg-primary/10 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#614afc"
            fillOpacity="1"
            d="M0,288L60,293.3C120,299,240,309,360,277.3C480,245,600,171,720,160C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>

        <section className="px-6 md:px-12 bg-primary/10">
          <div className="max-w-6xl mx-auto text-center">
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
        <svg
          className="bg-primary/10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#614afc"
            fillOpacity="1"
            d="M0,288L60,293.3C120,299,240,309,360,277.3C480,245,600,171,720,160C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

// Stat Item Component
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-2 md:p-4 flex flex-col justify-between items-center">
      <div className="text-sm text-white font-medium mb-3">{label}</div>
      <div className="text-2xl md:text-3xl font-bold text-primary mb-2 text-nowrap">
        {value}
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-muted rounded-xl">
      <div className="bg-primary/10 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
