"use client";

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  console.log(user);

  return (
    <>
      <h1>Profile Form</h1>

      <p>{clerkId}</p>
    </>
  );
};

export default Profile;
