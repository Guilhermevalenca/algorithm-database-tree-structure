import type { Route } from "../../+types/root";

// export async function loader({}: Route.LoaderArgs) {
//   return {
//     title: "Example",
//   };
// }

export default function ExampleRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {/* <h1>{loaderData?.title}</h1> */}
      <p>Apenas um arquivo de Examplo</p>
    </>
  );
}
