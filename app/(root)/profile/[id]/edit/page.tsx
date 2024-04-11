interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  return <div>Profile ID {params.id}</div>;
};

export default Page;
