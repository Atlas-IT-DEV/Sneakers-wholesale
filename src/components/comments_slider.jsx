import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Text } from "@chakra-ui/react";

import "swiper/css";
import { useStores } from "../store/store_context";
import CommentCard from "./comments_card";
import { observer } from "mobx-react-lite";

const CommentsSlider = observer(() => {
  const { pageStore } = useStores();
  return (
    <Swiper
      style={{
        display: "flex",
        width: "100%",
        height: "auto",
        marginBottom: "10px",
      }}
      modules={[FreeMode, Navigation, Pagination]}
      spaceBetween={50}
      freeMode={false}
    >
      {pageStore.comments?.map((item, index) => {
        return (
          <SwiperSlide
            key={index}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <CommentCard
              first_name={item?.user?.first_name}
              last_name={item?.user?.last_name}
              date_comment={item?.created_at}
              comment_text={item?.comment}
              images={item?.urls}
              name_product={item?.product?.name}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
});

export default CommentsSlider;
