export default function Room() {
  return <>hi</>;
}

export async function getServerSideProps(ctx) {
  console.log(ctx);

  return {
    props: {},
  };
}
