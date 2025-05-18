'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  BarChart,
  Lock,
  Globe,
  Layers,
  LineChart,
  Settings,
  Database,
  Sparkles,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

const services = [
  {
    title: 'Premium Service 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed nec fringilla turpis, eu condimentum massa.',
    icon: Zap,
    stats: {
      value: '96',
      suffix: '%',
      label: 'Client Satisfaction',
    },
  },
  {
    title: 'Premium Service 2',
    description:
      'Praesent gravida tristique magna, non efficitur neque vestibulum vitae. Maecenas mollis neque nec dolor maximus.',
    icon: BarChart,
    stats: {
      value: '25',
      suffix: 'x',
      label: 'ROI Improvement',
    },
  },
  {
    title: 'Premium Service 3',
    description:
      'Etiam convallis, nibh vitae dapibus venenatis, dolor mauris molestie ipsum, eu facilisis purus ipsum vitae ex.',
    icon: Lock,
    stats: {
      value: '99.9',
      suffix: '%',
      label: 'System Uptime',
    },
  },
  {
    title: 'Premium Service 4',
    description:
      'Suspendisse potenti. Vestibulum porttitor massa at lacus vehicula, nec placerat purus ultricies. Cras vel fringilla felis.',
    icon: Globe,
    stats: {
      value: '3',
      suffix: 'x',
      label: 'Market Reach',
    },
  },
  {
    title: 'Premium Service 5',
    description:
      'Mauris non lacinia diam. Nulla fermentum, felis in fermentum feugiat, odio libero consequat quam, quis ornare massa.',
    icon: Layers,
    stats: {
      value: '70',
      suffix: '%',
      label: 'Workflow Efficiency',
    },
  },
  {
    title: 'Premium Service 6',
    description:
      'Curabitur sagittis commodo ex, in aliquet massa imperdiet eu. Cras porttitor nibh sed ligula facilisis, ut condimentum nibh.',
    icon: LineChart,
    stats: {
      value: '85',
      suffix: '%',
      label: 'Growth Potential',
    },
  },
  {
    title: 'Premium Service 7',
    description:
      'Donec dignissim interdum magna, eget convallis sapien finibus sed. In finibus magna in quam egestas semper sed eu nibh.',
    icon: Settings,
    stats: {
      value: '300',
      suffix: '+',
      label: 'Features Included',
    },
  },
  {
    title: 'Premium Service 8',
    description:
      'Phasellus lacinia commodo lacus sed consectetur. Donec egestas rutrum pharetra. Sed tempus ac libero sit amet auctor.',
    icon: Database,
    stats: {
      value: '10',
      suffix: 'TB',
      label: 'Storage Capacity',
    },
  },
] as const;

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    },
  },
};

export function ServicesGrid() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background pattern - updated to match consistent style */}
      <div className="absolute inset-0 -z-[1]">
        <div className="bg-grid-white/5 absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center mb-6 rounded-full bg-primary/10 px-4 py-1 text-sm ring-1 ring-primary/20 backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Premium Services
            </span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
          <p className="mx-auto mt-4 text-xl text-muted-foreground">
            Discover how our services can revolutionise different aspects of your business
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div key={service.title} variants={cardVariants} className="group h-full">
                <Card className="relative h-full border-transparent transition-colors duration-500 hover:border-primary/20">
                  <div className="relative flex h-full flex-col p-6">
                    {/* Content */}
                    <div className="flex h-full flex-col">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                        className="h-12 w-12 rounded-xl bg-primary mb-4 p-2.5 text-white shadow-lg"
                      >
                        <Icon className="h-full w-full" />
                      </motion.div>

                      {/* Title & Description */}
                      <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="mb-6 text-sm text-muted-foreground">{service.description}</p>

                      {/* Stats */}
                      <div className="mt-auto flex items-baseline gap-2">
                        <div className="text-display-sm font-bold text-primary">
                          {service.stats.value}{service.stats.suffix}
                        </div>
                        <div className="text-body-sm text-muted-foreground">{service.stats.label}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 