import Layout from "@/src/components/Layout";
import { Calendar } from "@/src/components/calendar/Calendar";
import { type NextPage } from "next";

const UserDiet: NextPage = () => {
  return (
    <Layout>
      <Calendar />;
    </Layout>
  );
};

export default UserDiet;
