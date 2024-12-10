'use client'
import screenshotPreprocessing from '@/images/screenshots/contacts.png'
import screenshotPlagiarism from '@/images/screenshots/inventory.png'
import screenshotModelTraining from '@/images/screenshots/profit-loss.png'
import { useId } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'

import { Container } from '@/components/Container'
// import screenshotPreprocessing from '@/images/screenshots/preprocessing.png'
// import screenshotPlagiarism from '@/images/screenshots/plagiarism.png'
// import screenshotModelTraining from '@/images/screenshots/model-training.png'

interface Feature {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: React.ComponentType
  link: string
}

const features: Array<Feature> = [
  {
    name: 'IntelliDetect',
    summary: 'IntelliDetect',
    description:
      'IntelliDetect is an innovative tool designed to identify plagiarism in programming codes. By employing sophisticated algorithms such as text similarity analysis, tokenization, and abstract syntax tree (AST) comparisons, it effectively detects copied or modified codes across various languages. ',
    image: screenshotPreprocessing,
    icon: function PreprocessingIcon() {
      const id = useId()
      return (
        <>
          <defs>
            <linearGradient
              id={id}
              x1="11.5"
              y1={18}
              x2={36}
              y2="15.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".194" stopColor="#fff" />
              <stop offset={1} stopColor="#00A86B" />
            </linearGradient>
          </defs>
          <path
            d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
            stroke={`url(#${id})`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )
    },
    link: '/intellidetect',
  },
  {
    name: 'IntelliLearn',
    summary: 'Intellilearn',
    description:
      'IntelliLearn is a cutting-edge platform that empowers developers, students, and coding enthusiasts by providing relevant learning resources. With a single search, IntelliLearn curates YouTube tutorials, GitHub repositories, and Google search results for any code-related content.',
    image: screenshotPlagiarism,
    icon: function PlagiarismIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="#fff"
          />
        </>
      )
    },
    link: '/intellilearn',
  },
  {
    name: 'IntelliCheck',
    summary: 'IntilliCheck',
    description:
      'IntelliCheck is an advanced tool designed to ensure the integrity of student code submissions. It intelligently analyzes and compares code assignments from multiple students to detect similarities and potential plagiarism',
    image: screenshotModelTraining,
    icon: function ModelTrainingIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
            fill="#fff"
          />
        </>
      )
    },
    link: '/intellicheck',
  },
  {
    name: 'safeScan',
    summary: 'SafeScan',
    description:
      'SafeScan is a robust tool that performs multiple vulnerability assessments and security checks on your codebase. It systematically scans for potential security risks, such as SQL injections, cross-site scripting (XSS), insecure data handling, and outdated dependencies.',
    image: screenshotModelTraining,
    icon: function ModelTrainingIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
            fill="#fff"
          />
        </>
      )
    },
    link: 'http://localhost:8081/',
    // link: '/safescan',
  },
]

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature
  isActive: boolean
}) {
  return (
    <div
      className=" rounded-lg p-6 bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10 cursor-pointer hover:ring-slate-500/20 hover:shadow-slate-900/10"
      {...props}
    >
      <div className='flex justify-between items-center '>

        <div
          className={clsx(
            'w-9 rounded-lg',
            isActive ? 'bg-green-600' : 'bg-slate-500',
          )}
        >

          <svg aria-hidden="true" className="h-9 w-9" fill="none">
            <feature.icon />
          </svg>
          <div>
          </div>
        </div>
        <Link href={feature.link}>
          Try Now →
        </Link>
      </div>

      {/* <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-green-600' : 'text-slate-600',
        )}
      >
        {feature.name}
      </h3> */}
      <p className="mt-2 font-display text-xl text-slate-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary} className=''>

          <Feature feature={feature} className="mx-auto max-w-3xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  return (
    <TabGroup className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-2 gap-x-8 gap-y-8 max-w-4xl mx-auto ">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none ">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </TabList>

        </>
      )}
    </TabGroup>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for analyzing code plagiarism and performance"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Enhance your code analysis workflows.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Intelliscan helps you detect plagiarism, analyze code quality, and
            ensure academic integrity in your classrooms and codebases.
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
