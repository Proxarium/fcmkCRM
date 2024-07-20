"use client";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import NavigationLink from "./NavigationLink";
import {
  ChartBarIcon,
  ChartPieIcon,
  DocumentCheckIcon,
  HeartIcon,
  RocketLaunchIcon,
  Square2StackIcon,
  TruckIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import ProjectLink from "./ProjectLink";
import ProjectNavigation from "./ProjectNavigation";
import { UserButton } from "@clerk/nextjs";
import { IoAirplaneOutline } from "react-icons/io5";
import Image from "next/image";

const containerVariants = {
  close: {
    width: "4rem",
    overflow: "hidden",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "15rem",
    overflow: "visible",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-neutral-900 flex flex-col z-30 gap-20 p-3 absolute top-0 left-0 h-screen shadow shadow-neutral-600"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="flex flex-col w-10 h-10 bg-gradient-to-br  rounded-full">
            {isOpen && (
              <div className="">
                <div className="flex flex-row items-center ">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-20 h-20",
                      },
                    }}
                  />

                  {/* <p className="flex-row text-neutral-400 text-xs p-1">
                    Dmitrii Stepanov
                  </p> */}
                </div>
                <div className="">
                  {/* <p className="text-neutral-400 text-xs whitespace-nowrap p-1 ">
                    Медицинский брат анестезист
                  </p> */}
                </div>
              </div>
            )}
          </div>

          <button
            className="p-1 rounded-full flex"
            onClick={() => handleOpenClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-200"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <NavigationLink href="/mainpage" name="Главная">
            <UserCircleIcon className="stroke-inherit stroke-[0.75] min-w-8 w-14" />
          </NavigationLink>
          <NavigationLink href="/mainpage/brigade" name="Принять бригаду">
            <Image
              alt="iconcar"
              src="/kung.png"
              width={303}
              height={240}
              className="stroke-inherit stroke-[2.5] min-w-9 w-14"
            />
            {/* <TruckIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" /> */}
          </NavigationLink>
          <NavigationLink href="" name="Принять вылет">
            <Image
              alt="iconcar"
              src="/rescuepackmain.png"
              width={299}
              height={299}
              className="stroke-inherit stroke-[2.5] min-w-9 w-14"
            />
            {/* <RocketLaunchIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" /> */}
          </NavigationLink>
          <NavigationLink href="" name="ЭКМО">
            <Image
              alt="iconcar"
              src="/ecmo.png"
              width={504}
              height={301}
              className="stroke-inherit stroke-[2.5] min-w-9 w-14"
            />
            {/* <HeartIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" /> */}
          </NavigationLink>
          <NavigationLink href="/mainpage/recipe" name="Написать рецепт">
            <Image
              alt="iconcar"
              src="/recept.png"
              width={626}
              height={626}
              className="stroke-inherit stroke-[2.5] min-w-9 w-14"
            />
            {/* <ChartPieIcon className="stroke-inherit stroke-[0.75] min-w-9 w-14" /> */}
          </NavigationLink>
          {/* <NavigationLink href="" name="Пользователи">
            <UsersIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink> */}
        </div>
        <div className="flex flex-col gap-3">
          <ProjectLink
            name="Admin Panel"
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 mx-2 border-pink-600 border rounded-full aspect-square bg-pink-700" />
          </ProjectLink>
          <ProjectLink name="Dashboard" setSelectedProject={setSelectedProject}>
            <div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
          </ProjectLink>
          <ProjectLink name="Архив" setSelectedProject={setSelectedProject}>
            <div className="min-w-4 mx-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700" />
          </ProjectLink>
          <ProjectLink name="СОПы" setSelectedProject={setSelectedProject}>
            <div className="min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
          </ProjectLink>
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
            href=""
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
