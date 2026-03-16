import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header
        heading={"Next.js Forms"}
        description="client and server validation"
      />
      <p>
        There are several ways of handling forms and validation in Next.js. This
        project presents a few different options using multiple versions of form
        actions, such as using server actions, react-hook form and useFormState.
        It also explores server-side validation, custom client-side validation,
        and client-side validation with react-hook-form.
      </p>
    </>
  );
}
