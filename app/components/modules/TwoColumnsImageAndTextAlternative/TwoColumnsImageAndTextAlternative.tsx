import React from 'react';
import Image from 'next/image';
import Heading from '../../atoms/Heading/Heading';
import Subheading from '../../atoms/Subheading/Subheading';
import Button from '../../atoms/Button/Button';
import Customizations from '../../filters/Customizations';
import ColorComponent from '../../filters/ColorComponent';
import BackgroundColorComponent from '../../filters/BackgroundColorComponent';

interface TwoColumnsImageAndTextProps {
    switchColumnOrderOnDesktop?: boolean;
    rightColumn?: {
        heading?: string;
        subheading?: string;
        blurb?: string;
        button?: {
            target?: string;
            title?: string;
            url?: string;
        };
    };
    leftColumn?: {
        imageDesktop?: {
            sourceUrl?: string;
        };
        imageMobile?: {
            sourceUrl?: string;
        };
        announcement?: {
            backgroundColor?: string;
            bottomLine?: string;
            midLine?: string;
            topLine?: string;
            bottomLineColor?: string;
            midLineColor?: string;
            topLineColor?: string;
        };
    };
    customizations?: {
		topPaddingMobile?: string;
		topPaddingDesktop?: string;
		bottomPaddingMobile?: string;
		bottomPaddingDesktop?: string;
	};
}

const TwoColumnsImageAndText: React.FC<TwoColumnsImageAndTextProps> = ({ leftColumn, rightColumn, switchColumnOrderOnDesktop, customizations }) => {
    const className = `two-columns-image-and-text ${switchColumnOrderOnDesktop ? 'reverse-column' : ''}`;

    // Use imageDesktop as fallback if imageMobile is not available
    const mobileImageUrl = leftColumn?.imageMobile?.sourceUrl || leftColumn?.imageDesktop?.sourceUrl;
    const desktopImageUrl = leftColumn?.imageDesktop?.sourceUrl;


   return (
        <div className='container'>
             <Customizations
                topPaddingMobile={customizations?.topPaddingMobile}
                topPaddingDesktop={customizations?.topPaddingDesktop}
                bottomPaddingMobile={customizations?.bottomPaddingMobile}
                bottomPaddingDesktop={customizations?.bottomPaddingDesktop}
                >
            <div className={className}>
                {(mobileImageUrl || desktopImageUrl) && (
                    <div className='left-column col-12 col-lg-5 offset-lg-1'>
                        {mobileImageUrl && 
                            <Image 
                                className='d-block d-lg-none' 
                                src={mobileImageUrl} 
                                alt='Featured Image Mobile' 
                                width={500} 
                                height={500} 
                            />
                        }
                        {desktopImageUrl && 
                            <Image 
                                className='d-none d-lg-block' 
                                src={desktopImageUrl} 
                                alt='Featured Image Desktop' 
                                width={1000} 
                                height={1000} 
                            />
                        }
                        {leftColumn?.announcement && (
                               <BackgroundColorComponent color={leftColumn.announcement.backgroundColor} className='announcement'>
                                    {leftColumn.announcement.topLine && 
                                    <div className='b4'>
                                        <ColorComponent color={leftColumn.announcement.topLineColor}>
                                        {leftColumn.announcement.topLine}
                                        </ColorComponent>
                                    </div>
                                    }
                                    {leftColumn.announcement.midLine && <ColorComponent color={leftColumn.announcement.midLineColor}><div className='b7 mb-1 mt-1'>{leftColumn.announcement.midLine}</div></ColorComponent>}
                                    {leftColumn.announcement.bottomLine && <ColorComponent color={leftColumn.announcement.bottomLineColor}><div className='b3'>{leftColumn.announcement.bottomLine}</div></ColorComponent>}
                            </BackgroundColorComponent>
                        )}
                </div>
                )}
                <div className='right-column col-12 c col-lg-5 offset-lg-1'>
                    {rightColumn?.heading && <Heading level='h2'>{rightColumn.heading}</Heading>}
                    {rightColumn?.subheading && <Subheading level='h5'>{rightColumn.subheading}</Subheading>}
                    {rightColumn?.blurb && <div className='blurb' dangerouslySetInnerHTML={{ __html: rightColumn.blurb }} />}
                    {rightColumn?.button?.url && rightColumn?.button?.title && (
                        <Button href={rightColumn.button.url} target={rightColumn.button.target} label={rightColumn.button.title}>
                            {rightColumn.button.title}
                        </Button>
                    )}
                </div>
            </div>
            </Customizations>
        </div>
    );
}

export default TwoColumnsImageAndText;