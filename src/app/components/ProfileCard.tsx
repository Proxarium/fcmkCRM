import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  const brigade = await prisma.stateBrigade.findFirst({
    where: {
      userTakerId: userId,
      workStatus: true,
    },
    include: {
      medicalKit: {
        select: {
          name: true,
        },
      },
      ambulance: {
        select: {
          number: true,
        },
      },
    },
  });

  if (brigade) {
    const medicalKitName = brigade.medicalKit?.name;
    const ambulanceNumber = brigade.ambulance?.number;
    console.log(`MedicalKit Name: ${medicalKitName}`);
    console.log(`Ambulance Number: ${ambulanceNumber}`);
  } else {
    console.log("No active brigade found for the current user.");
  }

  if (!user) return null;

  return (
    <div className=" bg-neutral-800/20 rounded-lg  text-sm flex flex-col gap-6 w-max-screen">
      <div className="h-24 relative lg:h-52 md:h-40 sm:h-40 xs:h-40 xl:h-60 2xl:h-80">
        <Image
          src={user.cover || "/noCover.png"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold text-white">
          {/* {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username} */}
          {user.username}
        </span>
        {/* <div className="flex items-center gap-4"></div>
        <Link href={`/profile/${user.username}`}>
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link> */}
      </div>
      {brigade ? (
        <div>
          <div className="text-white">
            Ваша бригада: {brigade?.medicalKit.name}
          </div>
          <div className="text-white">
            Ваш АСМП №: {brigade?.ambulance.number}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileCard;
