import React from "react";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

const login = async (stateObj: { csrfToken?: string }) => {
  if (stateObj?.csrfToken) {
    const response = await fetch(
      `${process.env.API_URL}/auth/login/google?code=${stateObj?.csrfToken}`
    );
    const result = await response.json();
    console.log("xxx login result ", result);
    if (result.statusCode === 201) {
      return result;
    } else {
      redirect("/auth/login", RedirectType.push);
    }
  }
};

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const result = searchParams?.state
    ? await login(JSON.parse(searchParams.state))
    : null;

  return <div>This is Google Callback, {JSON.stringify(result)}</div>;
};

export default Page;
