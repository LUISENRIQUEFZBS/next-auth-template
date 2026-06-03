// "use client";

// import { useTranslations } from "next-intl";

// export default  function DashboardPage() {
//   const t =  useTranslations("Dashboard");

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold dark:bg-gray-950 dark:text-gray-100 inline-block px-2 py-1 rounded">
//         {t("title")}
//       </h1>

//       <p className="mt-2 text-gray-600">
//         {t("description")}
//       </p>
//     </div>
//   );
// }


import { getTranslations } from "next-intl/server";

export default async function DashboardPage({params}: {params: { locale: string }}) {
  const {locale} = await params;
  const t =  await getTranslations({locale,namespace: "Dashboard",});

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold dark:bg-gray-950 dark:text-gray-100 inline-block px-2 py-1 rounded">
        {t("title")}
      </h1>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {t("description")}
      </p>
    </div>
  );
}