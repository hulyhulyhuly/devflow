interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  return <div>Edit {params.id}</div>;
};

export default Page;
