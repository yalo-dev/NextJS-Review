import Image from "next/image";
import React from "react";
import Button from "../../atoms/Button/Button";
import Heading from "../../atoms/Heading/Heading";
import Subheading from "../../atoms/Subheading/Subheading";
import BackgroundColorComponent from "../../filters/BackgroundColorComponent";
import ColorComponent from "../../filters/ColorComponent";
import Customizations from "../../filters/Customizations";
import SelectDropdown from "../../molecules/SelectDropdown/SelectDropdown";

interface OptionType {
  label: string;
  url: string;
  target?: string;
}

interface TwoColumnsImageAndTextProps {
  switchColumnOrderOnDesktop?: boolean;
  switchRowOrderOnMobile?: boolean;
  centerModule?: boolean;
  rightColumn?: {
    heading?: string;
    subheading?: string;
    blurb?: string;
    blurbColor?: string;
    button?: {
      target?: string;
      title?: string;
      url?: string;
    };
    buttonStyle?: string;
    buttonTwo?: {
      target?: string;
      title?: string;
      url?: string;
    };
    buttonTwoStyle?: string;
    showDropdown?: boolean;
    options?: {
      option?: {
        target?: string;
        title?: string;
        url?: string;
      }[];
    };
  };
  leftColumn?: {
    imageDesktop?: {
      sourceUrl?: string;
      altText?: string;
    };
    imageMobile?: {
      sourceUrl?: string;
      altText?: string;
    };
    video?: {
      target?: string;
      title?: string;
      url?: string;
    };
    imageOrVideo?: string;
    announcement?: {
      backgroundColor?: string;
      bottomLine?: string;
      midLine?: string;
      topLine?: string;
      bottomLineColor?: string;
      midLineColor?: string;
      topLineColor?: string;
    };
    showAnnouncementTile?: boolean;
  };
  customizations?: {
    topPaddingMobile?: string;
    topPaddingDesktop?: string;
    bottomPaddingMobile?: string;
    bottomPaddingDesktop?: string;
  };
}

const TwoColumnsImageAndText: React.FC<TwoColumnsImageAndTextProps> = ({
  leftColumn,
  rightColumn,
  switchColumnOrderOnDesktop,
  switchRowOrderOnMobile,
  centerModule,
  customizations,
}) => {
  const className = `two-columns-image-and-text ${switchRowOrderOnMobile ? "reverse-row-mobile offset-lg-1" : ""} ${switchColumnOrderOnDesktop ? "reverse-column offset-lg-1" : ""} ${centerModule ? "center" : ""}`;

  const mobileImageUrl =
    leftColumn?.imageMobile?.sourceUrl || leftColumn?.imageDesktop?.sourceUrl;
  const desktopImageUrl = leftColumn?.imageDesktop?.sourceUrl;

  const renderMedia = () => {
    if (leftColumn?.imageOrVideo === "Image") {
      return (
        <>
          {leftColumn.imageMobile?.sourceUrl && (
            <Image
              className="d-block d-lg-none"
              src={desktopImageUrl}
              alt={leftColumn.imageMobile.altText || ""}
              width={1920}
              height={1920}
            />
          )}
          {leftColumn.imageDesktop?.sourceUrl && (
            <Image
              className="d-none d-lg-block"
              src={mobileImageUrl}
              alt={leftColumn.imageDesktop.altText || ""}
              width={1920}
              height={1920}
            />
          )}
        </>
      );
    } else if (leftColumn?.imageOrVideo === "Video") {
      return (
        leftColumn?.video?.url && (
          <div className="video-wrapper">
            <video
              className="d-block w-100"
              src={leftColumn.video.url}
              autoPlay
              muted
              loop
            />
          </div>
        )
      );
    }
    return null;
  };

  let dropdownOptions: OptionType[] = [];

  if (
    rightColumn?.showDropdown &&
    rightColumn?.options &&
    Array.isArray(rightColumn.options)
  ) {
    dropdownOptions = rightColumn.options.flatMap((dropItem) => {
      if (dropItem.option) {
        return {
          label: dropItem.option.title || "",
          url: dropItem.option.url || "",
          target: dropItem.option.target || "_self",
        };
      }
      return [];
    });
  }

  return (
    <div className="container two-column">
      <Customizations
        topPaddingMobile={customizations?.topPaddingMobile}
        topPaddingDesktop={customizations?.topPaddingDesktop}
        bottomPaddingMobile={customizations?.bottomPaddingMobile}
        bottomPaddingDesktop={customizations?.bottomPaddingDesktop}
      >
        <div className={className}>
          <div className="left-column col-12 col-lg-6 offset-lg-1">
            {renderMedia()}
            {leftColumn?.showAnnouncementTile && leftColumn?.announcement && (
              <BackgroundColorComponent
                color={leftColumn.announcement.backgroundColor}
                className="announcement"
              >
                {leftColumn.announcement.topLine && (
                  <div className="b4">
                    <ColorComponent
                      color={leftColumn.announcement.topLineColor}
                    >
                      {leftColumn.announcement.topLine}
                    </ColorComponent>
                  </div>
                )}
                {leftColumn.announcement.midLine && (
                  <ColorComponent color={leftColumn.announcement.midLineColor}>
                    <div className="b7 mb-1 mt-1">
                      {leftColumn.announcement.midLine}
                    </div>
                  </ColorComponent>
                )}
                {leftColumn.announcement.bottomLine && (
                  <ColorComponent
                    color={leftColumn.announcement.bottomLineColor}
                  >
                    <div className="b3">
                      {leftColumn.announcement.bottomLine}
                    </div>
                  </ColorComponent>
                )}
              </BackgroundColorComponent>
            )}
          </div>

          <div className="right-column col-12 c col-lg-6">
            {rightColumn?.heading && (
              <Heading level="h2" className="pe-0 pe-lg-5">
                {rightColumn.heading}
              </Heading>
            )}
            {rightColumn?.subheading && (
              <Subheading level="h5" className="pe-0 pe-lg-5">
                {rightColumn.subheading}
              </Subheading>
            )}
            {rightColumn?.blurb && (
              <div className="blurb pe-0 pe-lg-5">
                <ColorComponent color={rightColumn.blurbColor}>
                  <div
                    dangerouslySetInnerHTML={{ __html: rightColumn.blurb }}
                  />
                </ColorComponent>
              </div>
            )}
            <div className="button-container d-flex mt-3">
              {rightColumn?.button?.url && rightColumn?.button?.title && (
                <Button
                  href={rightColumn.button.url}
                  target={rightColumn.button.target}
                  label={rightColumn.button.title}
                  variant={rightColumn.buttonStyle || "primary"}
                >
                  {rightColumn.button.title}
                </Button>
              )}
              {rightColumn?.buttonTwo?.url && rightColumn?.buttonTwo?.title && (
                <Button
                  href={rightColumn.buttonTwo.url}
                  target={rightColumn.buttonTwo.target}
                  label={rightColumn.buttonTwo.title}
                  variant={rightColumn.buttonTwoStyle || "primary"}
                >
                  {rightColumn.buttonTwo.title}
                </Button>
              )}
              {rightColumn?.showDropdown &&
                dropdownOptions &&
                dropdownOptions.length > 0 && (
                  <SelectDropdown
                    options={dropdownOptions}
                    placeholder="Explore Classrooms"
                  />
                )}
            </div>
          </div>
        </div>
      </Customizations>
    </div>
  );
};

export default TwoColumnsImageAndText;
