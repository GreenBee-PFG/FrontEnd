import React from "react";


function NavItem({ menu }) {
  const imageStyle = {
    width: "30px", // 이미지의 가로 크기
    height: "30px", // 이미지의 세로 크기
    objectFit: "cover", // 이미지가 컨테이너에 맞게 조정됨
  };

  return (
    <div className="Nav-item">
      <img src={menu.image} style={imageStyle} alt={menu.alt}/>
    </div>
  );
}
export default NavItem;