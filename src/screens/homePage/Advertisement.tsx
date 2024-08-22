import React from "react";
import { Container } from "@mui/material";

export default function Advertiement() {
    return (
        <div className="ads-restaurant-frame">
          <video
            className={"ads-video"}
            autoPlay={true}
            loop
            muted
            playsInline
            data-video-media=""
          >
            <source type="video/mp4" src="video/ads.mp4" />
          </video>
        </div>
    );
}