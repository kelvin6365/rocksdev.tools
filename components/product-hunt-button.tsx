import Image from "next/image";

const ProductHuntFollow = () => {
  return (
    <div className="flex justify-center py-4">
      <a
        href="https://www.producthunt.com/posts/rocksdev-tools?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-rocksdev&#0045;tools"
        target="_blank"
      >
        <Image
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=682248&theme=light"
          alt="RocksDev&#0032;Tools - A&#0032;comprehensive&#0032;collection&#0032;of&#0032;developer&#0032;tools | Product Hunt"
          className="w-[250px] h-[54px]"
          width="250"
          height="54"
        />
      </a>
    </div>
  );
};

export default ProductHuntFollow;
