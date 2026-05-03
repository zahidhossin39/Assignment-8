import Banner from "@/components/home/Banner";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import TrendingBooks from "@/components/home/TrendingBooks";
import BestSellingBooks from "@/components/home/BestSellingBooks";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedBooks />
      <TrendingBooks />
      <BestSellingBooks />
    </div>
  );
}
