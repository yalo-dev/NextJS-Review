import { gql } from "@apollo/client";
import { client } from "../../../app/lib/apollo";

import Head from "next/head";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import EmergencyAlert from "../../../app/components/modules/EmergencyAlert/EmergencyAlert";
import GallerySlider from "../../../app/components/modules/GallerySlider/GallerySlider";
import { getAllSchools } from "../../../app/lib/pages";
import FirstFive from "../../../components/schools/FirstFive";
import HeroWithSlider from "../../../components/schools/HeroWithSlider";
import ScheduleATourSlider from "../../../components/schools/ScheduleATourSlider";
import SchoolNewsSlider from "../../../components/schools/SchoolNewsSlider";
import TestimonialSection from "../../../components/schools/TestimonialSection";
import getMenuItems from "../../../queries/getMenuItems";
import getSchoolsNav from "../../../queries/getSchoolsNav";

export async function getStaticPaths() {
  const schools = await getAllSchools();
  const dynamicPages = schools.filter((el) => el?.node.uri.length > 1);
  const paths = dynamicPages.map((school) => {
    return {
      params: {
        schoolSlug: school.node.slug,
        uri: school.node.uri,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const layoutSettings = await getMenuItems();
  const { schoolSlug } = params;
  const schoolNavData = await getSchoolsNav(schoolSlug);
  const GET_SCHOOLS = gql`
    query GetSchoolDetails($id: ID!) {
      siteSettings {
        siteSettings {
          defaultStaffPhoto {
            altText
            sourceUrl
          }
        }
      }
      school(id: $id, idType: URI) {
        id
        slug
        uri
        title
        seo {
          fullHead
        }
        schoolCorporateSettings {
          virtualTourUrl
          usesCalendly
          homepageMeta {
            description
            fieldGroupName
            title
          }
          accreditations {
            ... on Accreditation {
              id
              title
              accreditations {
                image {
                  altText
                  mediaItemUrl
                }
              }
            }
          }
          address {
            streetAddress
            streetAddress2
            zipcode
            state
            city
            googlePlaceUrl
            latitude
            longitude
          }
          emailAddress
          phoneNumber
          preopening
          virtualTourUrl
          homepageHeroImage {
            altText
            mediaItemUrl
          }
          openingIn {
            season
            year
          }
          homepageSubheadline {
            description
            title
          }
          corporateChildcare
          careerplugSchoolId
        }
        schoolAdminSettings {
          accreditation {
            imageAlt
            image {
              mediaItemUrl
            }
          }
          franchiseOwner {
            bio
            multipleOwners
            name
            image {
              altText
              sourceUrl
              mediaItemUrl
            }
            imageAltText
          }
          classroomsOffered
          extraCareOffered
          displayEmergencyAlert
          emergencyMessage {
            message
            expirationDate
          }
          enrollingNow
          facebookLink
          instagramLink
          gallery {
            caption
            title
            imageAlt
            image {
              mediaItemUrl
              sourceUrl
            }
          }
          hiringNow
          hoursOfOperation {
            closingTime
            openingTime
          }
          yelpLink
          newsItems {
            slug
            content
            expires
            image {
              sourceUrl
            }
            imageAlt
            publishDate
            shortDescription
            title
          }
          googleLink
          meetStaffImage {
            mediaItemUrl
          }
          assignedTestimonials {
            ... on Testimonial {
              id
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                  sourceUrl
                }
              }
              title
              testimonials {
                title
                testimonial
                heading
                name
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await client.query({
      query: GET_SCHOOLS,
      variables: { id: `/schools/${schoolSlug}/` },
      errorPolicy: "all",
    });

    //console.log("School Data:", response.data.school);

    const school = response?.data?.school;
    const staffImage =
      response?.data?.siteSettings?.siteSettings?.defaultStaffPhoto;
    if (!school) {
      return { notFound: true };
    }

    return {
      props: {
        school,
        layoutSettings,
        schoolNavData,
        schoolSlug,
        staffImage,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("getServerSideProps Error:", error);
    return { props: { hasError: true } };
  }
}

export default function SchoolMainPage({ school, schoolSlug, staffImage }) {
  const corporateSettings = school?.schoolCorporateSettings;
  const schoolState = corporateSettings?.address?.state;
  const schoolCity = corporateSettings?.address?.city;
  const metaTitle =
    corporateSettings?.homepageMeta?.title ??
    `Primrose School of ${school?.title} | Daycare and Preschool in ${schoolCity}, ${schoolState}`;
  const metaDesc = corporateSettings?.homepageMeta?.description;
  const adminSettings = school?.schoolAdminSettings;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const defaultImages = [
    {
      url: "/schoolsHomeDefault/scrollies-1.jpg",
      altText: "A child and teacher's hand on a book",
    },
    {
      url: "/schoolsHomeDefault/scrollies-2.jpg",
      altText: "A young boy playing with toys",
    },
    {
      url: "/schoolsHomeDefault/scrollies-3.jpg",
      altText: "A young boy playing to the floor looking up at camera",
    },
    {
      url: "/schoolsHomeDefault/scrollies-4.jpg",
      altText: "A young boy smiling at camera",
    },
    {
      url: "/schoolsHomeDefault/scrollies-5.jpg",
      altText: "A young boy looking at camera",
    },
  ];

  return (
    <div className="school school-home">
      <Head>
        <title>{metaTitle}</title>
        {metaDesc && <meta name={"description"} content={metaDesc} />}
      </Head>
      <EmergencyAlert />
      <HeroWithSlider
        corporateSettings={corporateSettings}
        adminSettings={adminSettings}
        schoolSlug={schoolSlug}
      />
      <FirstFive
        adminSettings={adminSettings}
        corporateSettings={corporateSettings}
        schoolSlug={schoolSlug}
        staffImage={staffImage}
      />
      <SchoolNewsSlider adminSettings={adminSettings} isClient={isClient} />
      <TestimonialSection adminSettings={adminSettings} />
      {adminSettings?.gallery?.length && (
        <GallerySlider
          gallery={adminSettings.gallery}
          uniqueId="gallerySlider"
        />
      )}
      <ScheduleATourSlider
        schoolSlug={schoolSlug}
        images={defaultImages}
        usesCalendly={corporateSettings?.usesCalendly}
      />
    </div>
  );
}
