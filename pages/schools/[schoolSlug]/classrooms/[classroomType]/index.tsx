import { client } from '../../../../../app/lib/apollo';
import { gql } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Heading from '../../../../../app/components/atoms/Heading/Heading';
import Subheading from '../../../../../app/components/atoms/Subheading/Subheading';
import Button from '../../../../../app/components/atoms/Button/Button';
import QuoteTestimonials from '../../../../../app/components/modules/QuoteTestimonials/QuoteTestimonials';
import GallerySlider from '../../../../../app/components/modules/GallerySlider/GallerySlider';
import GeneralButtonCTA from '../../../../../app/components/modules/GeneralButtonCTA/GeneralButtonCTA';
import GeneralHorizontalTabs from '../../../../../app/components/modules/GeneralHorizontalTabs/GeneralHorizontalTabs';
import { useRouter } from 'next/router';
import HeroWithImage from '../../../../../app/components/modules/HeroWithImage/HeroWithImage';
import TwoColumnsImageAndText from '../../../../../app/components/modules/TwoColumnsImageAndText/TwoColumnsImageAndText';

var camelize = require('camelize');

const GET_CLASSROOM_TYPE = gql`
      query GetSchoolDetails($id: ID!, $classroomId: ID!) {
        classroom(id: $classroomId, idType: URI) {
          title
          classroomModules {
            classroomHero {
              heroImage {
                altText
                mediaItemUrl
                sourceUrl
              }
              paragraph
              title
              heroVideo {
                mediaItemUrl
                sourceUrl
              }
              icon {
                altText
                mediaItemUrl
                sourceUrl
              }
            }
            isClassroom
            verticalTabs {
              tabs {
                content {
                  cta {
                    target
                    title
                    url
                  }
                  heading
                  headingColor
                  image {
                    altText
                    mediaItemUrl
                    sourceUrl
                  }
                  list {
                    detailsPopUp
                    icon {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                    text
                    textColor
                  }
                  subheading
                  subheadingColor
                }
                tabLabelColor
                label
              }
            }
          }
        }
        school(id: $id, idType: URI) {
          id
          slug
          uri
          schoolAdminSettings{
            facebookLink
            instagramLink
            yelpLink
            googleLink
            classroomsOffered
            extraCareOffered
            satImages {
              image {
                mediaItemUrl
                sourceUrl
              }
              imageAlt
            }
            staffMembers {
              name
              title
              bio
              classroomAssignment
              group
              image {
                mediaItemUrl
                sourceUrl
              }
              altText
            }
            infant {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
            }
            toddler {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
            }
            earlyPreschool {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
            }
            preschool {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
            }
            preKindergarten {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
            }
            kindergarten {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
            }
            preschoolPathways {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
            }
            beforeSchool {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
              bussingInformation{
                schoolName
              }
            }
            afterSchool {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
              bussingInformation{
                schoolName
              }
            }
            beforeAfterSchool {
              classroomGallery {
                image {
                  sourceUrl
                  mediaItemUrl
                }
                title
                caption
              }
              testimonials {
                ... on Testimonial {
                  id
                  title
                  testimonials {
                    name
                    heading
                    title
                    testimonial
                    featuredImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  uri
                }
              }
              healthSafety
              bussingInformation{
                schoolName
              }
            }
          }
        }
      }
    `;

export async function getServerSideProps(context) {
  const { schoolSlug, classroomType } = context.params;
  try {
    const response = await client.query({
      query: GET_CLASSROOM_TYPE,
      variables: {
        id: `/schools/${schoolSlug}/`,
        classroomId: `${classroomType}`
      },
    });
    
    if (!response || !response.data || !response.data.school) {
      return { notFound: true };
    }
    
    const school = response.data.school;
    
    const data = response.data;
    return {
      props: {
        school,
        schoolSlug,
        data

      },
    };
  } catch (error) {
    console.error('getServerSideProps Error:', error);
    return { props: { hasError: true } };
  }

}
interface StaffMember {
  altText?: string;
  image: {
    sourceUrl: string;
  };
  name: string;
  title: string;
  bio: string;
  group: string;
}

export default function ClassroomTypePage({ school, schoolSlug, data }) {
  
  const router = useRouter();
  const { classroomType } = router.query;
  const classroom = data?.classroom;
  const hasData = (data) => {
    return data && Object.keys(data).length > 0 && data.constructor === Object;
  };
  const featuredBanner = school?.schoolSettings?.classrooms?.classroomSelection?.classroomDetails?.infant?.featuredBanner || {};
  const generalButtonCTAProps = {
    icon: featuredBanner.icon,
    heading: featuredBanner.heading,
    subheading: featuredBanner.blurb,
    button: featuredBanner.button,
  };
  const shouldRenderCTA = hasData(featuredBanner) && featuredBanner.icon && featuredBanner.heading && featuredBanner.blurb && featuredBanner.button;
  console.log(classroom)
  let verticalTabs = classroom?.classroomModules?.verticalTabs;
  useEffect(() => {
    verticalTabs.tabs.map((tab, i) => {
      if(tab.label == "Healthy Bodies"){
        tab.content.list.map(listitem => {
          if(listitem.text == "Health & Safety"){
            listitem.detailsPopUp += school?.schoolAdminSettings[camelize(classroomType) as string].healthSafety;
          }
        });
      }
    });
  },[classroom])

  const testimonialSection = () => {
    const adminSettings = school?.schoolAdminSettings;
    //console.log(adminSettings[camelize(classroomType) as string]);
    if(!school?.schoolAdminSettings[camelize(classroomType) as string]?.testimonials){
      return;
    }
    const transformedTestimonials = adminSettings[camelize(classroomType) as string]?.testimonials?.map(testimonial => ({
        avatar: {
            sourceUrl: testimonial.featuredImage?.node?.sourceUrl,
            altText: 'Testimonial'
        },
        name: testimonial.testimonials.name,
        position: testimonial.testimonials.title,
        content: {
            heading: testimonial.testimonials.heading,
            blurb: testimonial.testimonials.testimonial
        }
    }));
    const heading = "See What Families Are Saying";
    if(!transformedTestimonials) return null;
    return (
        <>
            <QuoteTestimonials
                tabs={transformedTestimonials}
                heading={heading} customizations={{
                    topPaddingMobile: 'Medium',
                    topPaddingDesktop: 'Medium',
                    bottomPaddingMobile: 'Medium',
                    bottomPaddingDesktop: 'Medium',
                    backgroundColor: ''
                }} headingColor={''} />
            <div className='container'>
                <div className='reviews d-flex align-items-center justify-content-center justify-content-lg-end'>
                    <h5 className='green mb-0'>See more Reviews:</h5>
                    {adminSettings.facebookLink && (
                        <a href={adminSettings.facebookLink} target="_blank" rel="noopener noreferrer" className='fb'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                <path d="M30.5 20.7605C30.5 15.2037 26.0231 10.6992 20.5013 10.6992C14.9769 10.7005 10.5 15.2037 10.5 20.7617C10.5 25.7823 14.157 29.9443 18.9364 30.6992V23.6688H16.3993V20.7617H18.9389V18.5432C18.9389 16.0223 20.4325 14.63 22.716 14.63C23.8108 14.63 24.9544 14.8262 24.9544 14.8262V17.3009H23.6934C22.4523 17.3009 22.0648 18.077 22.0648 18.8732V20.7605H24.837L24.3945 23.6676H22.0636V30.698C26.843 29.9431 30.5 25.7811 30.5 20.7605Z" fill="black" />
                            </svg>
                        </a>
                    )}
                    {adminSettings.googleLink && (
                        <a href={adminSettings.googleLink} target="_blank" rel="noopener noreferrer" className='google'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                <path d="M30.0049 19.1581L29.904 18.73H20.5987V22.6684H26.1585C25.5812 25.4095 22.9027 26.8523 20.7147 26.8523C19.1228 26.8523 17.4446 26.1827 16.3339 25.1064C15.7479 24.5294 15.2815 23.8425 14.9612 23.0851C14.641 22.3276 14.4734 21.5144 14.4679 20.6921C14.4679 19.0331 15.2134 17.3738 16.2982 16.2823C17.383 15.1907 19.0214 14.58 20.6504 14.58C22.5161 14.58 23.8531 15.5706 24.3531 16.0224L27.1518 13.2385C26.3308 12.5171 24.0754 10.6992 20.5603 10.6992C17.8482 10.6992 15.2478 11.7381 13.3469 13.6327C11.471 15.4983 10.5 18.1961 10.5 20.6992C10.5 23.2023 11.4188 25.7653 13.2366 27.6456C15.179 29.651 17.9299 30.6992 20.7625 30.6992C23.3397 30.6992 25.7826 29.6894 27.5237 27.8573C29.2353 26.0537 30.1205 23.5581 30.1205 20.9421C30.1205 19.8407 30.0098 19.1867 30.0049 19.1581Z" fill="black" />
                            </svg>
                        </a>
                    )}
                    {adminSettings.yelpLink && (
                        <a href={adminSettings.yelpLink} target="_blank" rel="noopener noreferrer" className='yelp'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                <path d="M17.7341 23.318L18.6541 23.1055C18.6849 23.0986 18.7154 23.0903 18.7454 23.0805C18.9036 23.0381 19.0492 22.9581 19.1698 22.8472C19.2904 22.7364 19.3825 22.5981 19.4381 22.444C19.4937 22.2899 19.5112 22.1247 19.4892 21.9624C19.4672 21.8001 19.4063 21.6455 19.3116 21.5118C19.2088 21.3809 19.0814 21.2714 18.9366 21.1893C18.7656 21.0918 18.5866 21.009 18.4016 20.9418L17.3916 20.573C16.8252 20.3622 16.2569 20.1567 15.6866 19.9568C15.3153 19.8242 14.9991 19.7092 14.7278 19.6242C14.6766 19.608 14.6191 19.593 14.5728 19.5767C14.3286 19.4921 14.0735 19.4433 13.8153 19.4317C13.6808 19.4263 13.5469 19.451 13.4232 19.504C13.2995 19.557 13.1892 19.6369 13.1003 19.738C13.0537 19.7907 13.0099 19.8458 12.969 19.903C12.8903 20.0241 12.8253 20.1537 12.7753 20.2893C12.5878 20.843 12.494 21.4243 12.5003 22.0093C12.5028 22.538 12.5165 23.2168 12.8078 23.6768C12.8775 23.7949 12.9712 23.8971 13.0828 23.9768C13.2903 24.1193 13.4991 24.1381 13.7166 24.1531C14.0416 24.1768 14.3578 24.0968 14.6716 24.0243L17.7304 23.3168L17.7341 23.318ZM28.008 18.4292C27.7566 17.9017 27.4186 17.42 27.008 17.0042C26.9032 16.9046 26.788 16.8165 26.6642 16.7417C26.6034 16.708 26.5408 16.6776 26.4767 16.6505C26.3526 16.5988 26.2185 16.5754 26.0842 16.5821C25.9499 16.5888 25.8188 16.6254 25.7005 16.6892C25.523 16.7767 25.333 16.9167 25.0805 17.1517C25.0455 17.1867 25.0017 17.2267 24.963 17.263C24.7542 17.458 24.5217 17.7005 24.2454 17.9817C23.8204 18.413 23.3992 18.8455 22.9829 19.2842L22.2354 20.0593C22.0986 20.2006 21.974 20.3532 21.8629 20.5155C21.7678 20.6526 21.7011 20.8073 21.6667 20.9705C21.6461 21.0954 21.6491 21.223 21.6754 21.3468C21.6754 21.353 21.6779 21.358 21.6792 21.363C21.7379 21.6194 21.8939 21.843 22.1143 21.9866C22.3346 22.1303 22.6021 22.1828 22.8604 22.133C22.8915 22.1287 22.9224 22.1229 22.9529 22.1155L26.9342 21.1955C27.248 21.123 27.5667 21.0555 27.8492 20.893C28.038 20.783 28.218 20.6743 28.3417 20.4555C28.4074 20.3347 28.447 20.2014 28.458 20.0643C28.5205 19.5217 28.2355 18.9055 28.008 18.4292ZM20.8817 20.103C21.1692 19.7405 21.1692 19.2005 21.1942 18.7592C21.2817 17.283 21.3729 15.8067 21.4454 14.3304C21.4729 13.7704 21.5329 13.2179 21.5004 12.6554C21.4729 12.1904 21.4692 11.6566 21.1754 11.2754C20.6592 10.6029 19.5541 10.6579 18.7991 10.7616C18.5679 10.7929 18.3366 10.8366 18.1079 10.8916C17.8794 10.9453 17.653 11.0074 17.4291 11.0779C16.7041 11.3154 15.6878 11.7491 15.5166 12.5829C15.4191 13.0542 15.6491 13.5367 15.8278 13.9667C16.0441 14.4879 16.3403 14.9567 16.6091 15.4479C17.3216 16.743 18.0466 18.0305 18.7691 19.3192C18.9841 19.7042 19.2191 20.1905 19.6379 20.3905C19.6654 20.403 19.6941 20.413 19.7229 20.4218C19.9104 20.493 20.1141 20.5068 20.3091 20.4618L20.3441 20.453C20.5243 20.4041 20.6874 20.3064 20.8154 20.1705C20.8387 20.1488 20.8608 20.1271 20.8817 20.103ZM20.5366 24.0543C20.41 23.877 20.2246 23.7503 20.0133 23.6967C19.8021 23.6432 19.5787 23.6662 19.3829 23.7618C19.3193 23.7939 19.2586 23.8316 19.2016 23.8743C19.0389 24.0024 18.8935 24.1512 18.7691 24.3168C18.7366 24.3581 18.7066 24.4131 18.6691 24.4468L18.0291 25.3281C17.6666 25.8218 17.3079 26.3168 16.9529 26.8193C16.7216 27.1443 16.5203 27.4181 16.3628 27.6606L16.2728 27.7981C16.0828 28.0919 15.9753 28.3056 15.9203 28.4969C15.8794 28.6234 15.8666 28.7574 15.8828 28.8894C15.8991 29.0269 15.9453 29.1606 16.0178 29.2794C16.0566 29.3381 16.0978 29.3956 16.1428 29.4519C16.2384 29.5624 16.3462 29.6618 16.4641 29.7481C17.2797 30.3006 18.2265 30.6283 19.2091 30.6981C19.3553 30.703 19.5016 30.6916 19.6454 30.6644C19.7143 30.6481 19.7824 30.6281 19.8491 30.6044C19.9792 30.5553 20.0976 30.4795 20.1966 30.3819C20.2909 30.2879 20.3634 30.1744 20.4091 30.0494C20.4829 29.8656 20.5316 29.6306 20.5629 29.2831L20.5779 29.1206C20.6029 28.8319 20.6154 28.4931 20.6341 28.0944C20.6654 27.4818 20.6891 26.8693 20.7092 26.2581L20.7504 25.1706C20.7667 24.909 20.7435 24.6465 20.6817 24.3918C20.6511 24.2723 20.603 24.1583 20.5366 24.0543ZM27.7655 25.7568C27.5816 25.5705 27.3719 25.4114 27.143 25.2843L27.003 25.2006C26.7542 25.0506 26.4555 24.8931 26.1042 24.7031C25.5667 24.4081 25.0292 24.1206 24.4854 23.8343L23.5267 23.3255C23.4767 23.3105 23.4267 23.2755 23.3792 23.2518C23.1948 23.1576 22.999 23.0879 22.7967 23.0443C22.7266 23.0307 22.6555 23.0232 22.5842 23.0218C22.3666 23.0226 22.1562 23.1004 21.9904 23.2413C21.8246 23.3822 21.7139 23.5772 21.6779 23.7918C21.663 23.9138 21.6672 24.0374 21.6904 24.1581C21.7379 24.4131 21.8529 24.6656 21.9704 24.8868L22.4829 25.8468C22.7679 26.3893 23.0567 26.9268 23.3529 27.4643C23.5429 27.8144 23.7029 28.1144 23.8504 28.3631C23.8792 28.4094 23.9104 28.4594 23.9354 28.5031C24.1167 28.8019 24.2617 28.9906 24.4092 29.1244C24.5068 29.2191 24.6244 29.2909 24.7533 29.3344C24.8822 29.3778 25.0192 29.3919 25.1542 29.3756C25.2248 29.3674 25.2949 29.3553 25.3642 29.3394C25.5052 29.3008 25.6414 29.2467 25.7705 29.1781C26.1604 28.9597 26.5198 28.6907 26.8392 28.3781C27.2217 28.0031 27.5605 27.5906 27.8242 27.1206C27.8617 27.0543 27.893 26.9843 27.9192 26.9143C27.9441 26.8484 27.9653 26.7813 27.983 26.7131C27.9992 26.6431 28.0105 26.5743 28.0192 26.5031C28.0322 26.365 28.016 26.2258 27.9717 26.0943C27.9285 25.9681 27.8581 25.8529 27.7655 25.7568Z" fill="black" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </>
    )
}
  const findASchool = () => {

    const ScheduleATour = school?.schoolAdminSettings[camelize(classroomType) as string]?.classroomGallery? school?.schoolAdminSettings[camelize(classroomType) as string].classroomGallery : school?.schoolAdminSettings?.satImages ;
    const hasScheduleATour = ScheduleATour;
    const leftScrollerRef = useRef<HTMLDivElement>(null);
    const rightScrollerRef = useRef<HTMLDivElement>(null);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    const scrollContent = () => {
      const leftScroller = leftScrollerRef.current;
      const rightScroller = rightScrollerRef.current;

      if (leftScroller) {
        leftScroller.scrollTop += 1;
        if (leftScroller.scrollTop >= leftScroller.scrollHeight / 2) {
          leftScroller.scrollTop = 0;
        }
      }

      if (rightScroller) {
        rightScroller.scrollTop -= 1;
        if (rightScroller.scrollTop <= 0) {
          rightScroller.scrollTop = rightScroller.scrollHeight / 2;
        }
      }
    };

    useEffect(() => {
      const checkIfImagesLoaded = () => {
        const images = document.querySelectorAll('.find-a-school .image-scroller img');
        return Array.from(images).every((img) => (img as HTMLImageElement).complete);
      };
      if (checkIfImagesLoaded()) {
        setAllImagesLoaded(true);
        setInterval(scrollContent, 20);
      } else {
        const images = document.querySelectorAll('.find-a-school .image-scroller img');
        images.forEach((img) => {
          img.addEventListener('load', () => {
            if (checkIfImagesLoaded()) {
              setAllImagesLoaded(true);
              setInterval(scrollContent, 20);
            }
          });
        });
      }
    }, []);
    if (!hasScheduleATour) return null;
    return (

      <div className='container'>
        <div className='find-a-school'>
          <div className='left-column col-8 col-lg-7 col-xxl-6 d-lg-flex flex-lg-column justify-content-lg-center'>
           <Heading level='h2'>Our family would love to meet yours.</Heading>
             <Subheading level='div' className='b3'>Contact us to schedule a tour.</Subheading>
            
             <Button variant="secondary" href={"/schools/" + schoolSlug + "/schedule-a-tour"}>
                  Schedule A Tour
              </Button>
            
          </div>
          <div className='right-column col-4 col-lg-5 col-xxl-6'>
            {ScheduleATour && ScheduleATour.length > 0 && (
              <>
                <div className="image-scroller first" ref={leftScrollerRef}>
                  {ScheduleATour.map((imgObj, idx) => (
                    imgObj.image.sourceUrl && <img key={idx} src={imgObj.image.sourceUrl} alt={imgObj.altText || 'slider image'} />
                  ))}
                  {ScheduleATour.map((imgObj, idx) => (
                    imgObj.image.sourceUrl && <img key={`dup-${idx}`} src={imgObj.image.sourceUrl} alt={imgObj.altText || 'slider image'} />
                  ))}
                </div>
                <div className="image-scroller second" ref={rightScrollerRef}>
                  {ScheduleATour.map((imgObj, idx) => (
                    imgObj.image.sourceUrl && <img key={idx} src={imgObj.image.sourceUrl} alt={imgObj.altText || 'slider image'} />
                  ))}
                  {ScheduleATour.map((imgObj, idx) => (
                    imgObj.image.sourceUrl && <img key={`dup-${idx}`} src={imgObj.image.sourceUrl} alt={imgObj.altText || 'slider image'} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
  const BussingInformation = () => {
    let bussingInformation = school?.schoolAdminSettings[camelize(classroomType) as string]?.bussingInformation;
    if(!bussingInformation){
      return;
    }
    let bussing = bussingInformation.map((elementarySchool) =>{
      return elementarySchool.schoolName;  
    });
    if(classroomType.indexOf('school') != -1 && bussingInformation){
      const bussingProps =  {
        switchColumnOrderOnDesktop: false,
        centerModule: true,
        rightColumn: {
            heading: "We bus to the following Elementary Schools:",
            subheading: "",
            blurb: bussing.join(" <br /> "),
            button: {},
            buttonStyle: "",
            buttonTwo: {},
            buttonTwoStyle: "",
            showDropdown: false,
            options: {},
        },
        leftColumn: {
            imageDesktop: {
                sourceUrl: 'https://settings.primroseschools.com/wp-content/uploads/2024/02/FlowerCraft-Header.jpg',
                altText: 'bussing image'
            },
            imageMobile: {
                sourceUrl: 'https://settings.primroseschools.com/wp-content/uploads/2024/02/FlowerCraft-Header.jpg',
                altText: 'bussing image mobile'
            },
            video: {},
            imageOrVideo: "Image",
            announcement: {},
            showAnnouncementTile: false
        },
        customizations: {}
    }

      return <TwoColumnsImageAndText {...bussingProps} />
    }else{
      return;
    }
  }
  const StaffMembers = () => {
    const [visibleStaffCount, setVisibleStaffCount] = useState(20);
    const [activeBio, setActiveBio] = useState(null);
    const [bioHeights, setBioHeights] = useState({});
    const staffMembersData = school?.schoolAdminSettings?.staffMembers || [];
    const currentClassroomType = classroomType?.toString().toLowerCase();
    const assignedStaffMembers = staffMembersData.filter(member =>
      member.classroomAssignment?.toLowerCase() === currentClassroomType
    );
    const canLoadMore = assignedStaffMembers.length > visibleStaffCount;
    const classroomTypeString = Array.isArray(classroomType) ? classroomType[0] : classroomType;
    const classroomTypeFormatted = classroomTypeString
      ? classroomTypeString.charAt(0).toUpperCase() + classroomTypeString.slice(1).toLowerCase()
      : 'Classroom';

    const loadMoreStaff = () => {
      setVisibleStaffCount(prevCount => prevCount + 4);
    };

    const measureBioHeight = (index) => {
      requestAnimationFrame(() => {
        const bioElement = document.querySelector(`#bio-${index}`);
        if (bioElement) { // null check
          const height = bioElement.scrollHeight;
          setBioHeights({ ...bioHeights, [index]: height });
        }
      });
    };

    const handleToggleBio = (index) => {
      if (activeBio !== index) {
        measureBioHeight(index);
      }
      setActiveBio(activeBio === index ? null : index);
    };
    if(assignedStaffMembers.length < 1) return null;
    return (
      <div className='staff'>
        <div className='heading'>
          <h2>Our {classroom.title} Classroom Teachers & Staff</h2>
        </div>
        <div className='row'>
          <div className='staff-members-section'>
            <div className='staff-members'>
              {assignedStaffMembers.slice(0, visibleStaffCount).map((member, index) => (
                <div className={`staff-member ${activeBio === index ? 'expanded' : ''}`} key={index}>
                  <div className='row align-items-center'>
                    <div className='col-4'>
                      {member.image && <img src={member.image.sourceUrl} alt={member.name} className='img-fluid' />}
                    </div>
                    <div className='col-7 '>
                      <div className='text-wrap pe-5'>
                        <h5 className='mb-0'>{member.name}</h5>
                        <div className='b3'>{member.title}</div>
                        <span className='staff-group'>{member.group}</span>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div
                        className={`bio ${activeBio === index ? 'expanded' : ''}`}
                        id={`bio-${index}`}
                        style={{ maxHeight: activeBio === index ? `${bioHeights[index]}px` : '0' }}
                      >
                        <div className='b3 p-3' dangerouslySetInnerHTML={{ __html: member.bio }} />
                      </div>
                    </div>
                    <div id="button" onClick={() => handleToggleBio(index)} className={activeBio === index ? 'expanded' : ''}>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {canLoadMore && (
              <div className="load-more">
                <Button onClick={loadMoreStaff}>Load More</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const selectedDomains = school?.schoolSettings?.classrooms?.classroomSelection?.classroomDetails?.infant?.learningDomains?.selectDomains || [];
  const isDomainSelected = (domain) => {
    return selectedDomains.includes(domain);
  };

 
  const heroData = classroom?.classroomModules?.classroomHero;
  const shouldReverseColumn = true;
  const heroProps = {
    leftColumn: {
      image: {
        sourceUrl: heroData?.heroImage.sourceUrl,
        altText: heroData?.heroImage?.altText || ''
      },
    },
    rightColumn: {
      heading: heroData?.title,
      blurb: heroData?.paragraph,
      button: {
        target: heroData?.button?.target || '_self',
        title: heroData?.button?.title,
        url: heroData?.button?.url
      },
    },
    switchColumnOrderOnDesktop: shouldReverseColumn,
    // Add other properties as needed, like accent, switchColumnOrderOnDesktop, customizations, etc.
  };

  return (

    <div className='school classroom-type'>
      <HeroWithImage {...heroProps} />
      <div className="container">
        <h2 className="heading">Overview of Learning Domains</h2>
      </div>
      
      <GeneralHorizontalTabs {...verticalTabs} />
      {BussingInformation()}
      <div className='background-color'>
        {StaffMembers()}
       {shouldRenderCTA && (
        <GeneralButtonCTA
          variation="violet"
          buttonStyle="white"
          accents={{
            accentOne: {
              sourceUrl: '/assets/transparent-square.svg',
            },
            accentTwo: {
              sourceUrl: '/assets/transparent-circle.svg',
            }
          }}
          {...generalButtonCTAProps}
        />
        )}
      </div>
      {testimonialSection()}
      {findASchool()}
    </div>
  );

}



