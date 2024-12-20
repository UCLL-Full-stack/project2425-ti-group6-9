import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    // get new locale from event and push it to the router
    router.push(router.pathname, router.asPath, {locale: event.target.value});
  };

  return (
    <div className="ml-6">
      <label htmlFor="language" className="nav-link px-4 fs-5 text-white">
        Language
      </label>
      <select
        id="language"
        className="ml-2 p-1 nav-link px-4 fs-5 text-white"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default Language;
