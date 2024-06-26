import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import HeroWithImage from "../../../../app/components/modules/HeroWithImage/HeroWithImage";
import LargeCardSlider from "../../../../app/components/modules/LargeCardSlider/LargeCardSlider";
import FindASchoolMap from "../../../../app/components/modules/MapSearch/MapSearch";
import OpenPositions from "../../../../app/components/modules/OpenPositions/OpenPositions";
import TestimonialsWithVideoOrImage from "../../../../app/components/modules/TestimonialsWithVideoOrImage/TestimonialsWithVideoOrImage";
import TwoColumnsImageAndText from "../../../../app/components/modules/TwoColumnsImageAndText/TwoColumnsImageAndText";
import { client } from "../../../../app/lib/apollo";

const GET_LOCATIONS = gql`
  query GetLocations {
    markets {
      edges {
        node {
          uri
          slug
        }
      }
      nodes {
        slug
        uri
      }
    }
  }
`;
export async function getAllLocations() {
  const locations = await client.query({ query: GET_LOCATIONS });
  return locations?.data!.markets.edges;
}

export default function Location({ locationData }) {
  //console.log(locationData);
  const market = locationData.data.market;
  const siteSettings = locationData.data.siteSettings.siteSettings;
  const router = useRouter();

  const heroImage = market?.marketSettings?.careersHero?.heroImage?.sourceUrl
    ? {
        sourceUrl: market?.marketSettings?.careersHero?.heroImage?.sourceUrl,
        altText: market?.marketSettings?.careersHero?.heroImage?.altText,
      }
    : {
        sourceUrl: siteSettings?.headerImage?.sourceUrl,
        altText: siteSettings?.headerImage?.altText,
      };
  const hero_props = {
    leftColumn: { image: heroImage },
    rightColumn: {
      heading:
        market?.marketSettings?.marketCareersPageHeadline ??
        "Primrose Schools Careers in the " + market.name + " Area",
      headingColor: "white",
      blurbColor: "white",
      blurb: market.marketSettings.careersHero?.heroParagraph,
      button: { title: "See Open Positions", url: "#jobs" },
      buttonStyle: "secondary",
    },
    customizations: {
      backgroundColor: "#5E6738",
      topPaddingDesktop: "None",
      topPaddingMobile: "None",
    },
    switchColumnOrderOnDesktop: true,
  };

  const fiftyFifty1Image = market?.marketSettings?.careersFiftyFifty1?.image
    ?.sourceUrl
    ? {
        sourceUrl: market?.marketSettings?.careersFiftyFifty1?.image?.sourceUrl,
        altText: market?.marketSettings?.careersFiftyFifty1?.image?.altText,
      }
    : {
        sourceUrl: siteSettings?.developYourCareerImage?.sourceUrl,
        altText: siteSettings?.developYourCareerImage?.altText,
      };
  const fiftyFifty1_props = {
    switchColumnOrderOnDesktop: false,
    centerModule: true,
    rightColumn: {
      heading: market.marketSettings.careersFiftyFifty1.title,
      blurb: market.marketSettings.careersFiftyFifty1.paragraph,
      button: {
        title: market.marketSettings.careersFiftyFifty1.cta?.title,
        url: market.marketSettings.careersFiftyFifty1.cta?.url,
        target: market.marketSettings.careersFiftyFifty1.cta?.target,
      },
    },
    leftColumn: {
      imageOrVideo: "Image",
      imageDesktop: fiftyFifty1Image,
      imageMobile: fiftyFifty1Image,
    },
  };

  const testimonials = [];
  market?.marketSettings?.careersTestimonials?.map((testimonial, index) => {
    const { sourceUrl, altText } = testimonial.testimonialImage || {};
    testimonials.push({
      imageOrVideo: "image",
      ...(sourceUrl && { image: { sourceUrl, altText } }),
      title: testimonial?.name,
      position: testimonial?.title,
      testimonial: testimonial?.testimonial,
    });
  });

  const testimonials_props = {
    slider: testimonials,
    heading: market.marketSettings.testimonialsSectionTitle,
    subheading: market.marketSettings.testimonialsSectionDescription,
  };
  let benefits = market.marketSettings.schoolBenefitsSection;

  let benefitsItems = [];
  benefits?.benefits?.map((benefit, index) => {
    benefitsItems.push({
      icon: {
        sourceUrl: benefit.icon?.sourceUrl,
        altText: benefit.icon?.altText,
      },
      title: benefit?.title,
      paragraph: benefit?.paragraph,
    });
  });

  const benefitsImage = benefits?.image?.sourceUrl
    ? {
        sourceUrl: benefits?.image?.sourceUrl,
        altText: benefits?.image?.altText,
      }
    : {
        sourceUrl: siteSettings?.benefitsImage?.sourceUrl,
        altText: siteSettings?.benefitsImage?.altText,
      };
  const benefits_props = {
    buttonStyle: "secondary",
    button: {
      title: benefits?.cta?.title,
      target: benefits?.cta?.target,
      url: benefits?.cta?.url,
    },
    heading: benefits?.headline,
    paragraph: benefits?.paragraph,
    image: benefitsImage,
    slider: benefitsItems,
  };

  const schools = market?.schools?.nodes;

  // market.schools.nodes.map((school, index) => {
  //   schools.push({
  //     id: school.slug,
  //     name: "Primrose School " + school.schoolCorporateSettings.schoolOfAtOn + " " + school.title,
  //     address: school.schoolCorporateSettings.address.streetAddress +  "  " + school.schoolCorporateSettings.address.city + ", " + school.schoolCorporateSettings.address.state + "  " + school.schoolCorporateSettings.address.zipcode,
  //     //hours: school.schoolAdminSettings.hoursOfOperation.openingTime + " - " + school.schoolAdminSettings.hoursOfOperation.closingTime,
  //     notes: " ",
  //     coordinates: {
  //       lat: school.schoolCorporateSettings.address.latitude as number,
  //       lng: school.schoolCorporateSettings.address.longitude as number
  //     }

  //   })
  // });
  const map_props = {
    title: "Primrose Schools in the " + market.name + " Area",
    schools: schools,
    center: {
      latitude: market?.marketSettings?.marketCenter?.latitude,
      longitude: market?.marketSettings?.marketCenter?.longitude,
    },
    cta: {
      title: "View Open Positions",
      href: `careers`,
    },
  };
  const positions_props = {
    careerPlugId: 123456,
    // market?.marketSettings?.careerplugSchoolId
  };
  return (
    <>
      <div className="modules--container market mt-4 pt-4">
        <HeroWithImage {...hero_props} />
        <TwoColumnsImageAndText {...fiftyFifty1_props} />
        <LargeCardSlider {...benefits_props} />
        {testimonials.length > 0 && (
          <TestimonialsWithVideoOrImage {...testimonials_props} />
        )}
        <OpenPositions {...positions_props} />
        <FindASchoolMap {...map_props} />
      </div>
    </>
  );
}

//export async function getStaticProps({params={slug:""}, preview=false} = {}) {
export async function getServerSideProps({
  params = { locationsSlug: "" },
  preview = false,
} = {}) {
  const slug = params.locationsSlug;
  //console.log(params);
  const GET_LOCATION = gql`
        query GetLocationData {
            market(id: "${"locations/" + slug}", idType: URI) {
                name
                schools (first:100000) {
                  nodes {
                    title
                    uri
                    slug
                    databaseId
                    schoolAdminSettings {
                      hoursOfOperation {
                        closingTime
                        openingTime
                      }
                    }
                    schoolCorporateSettings {
                      schoolOfAtOn
                      address {
                        streetAddress
                        streetAddress2
                        city
                        state
                        zipcode
                        latitude
                        longitude
                        googlePlaceUrl
                      }
                    }
                  }
                }
                marketSettings {
                  seo {
                    description
                    title
                  }
                  marketCareersPageHeadline
                  heroImage {
                    mediaItemUrl
                    sourceUrl
                    altText
                  }
                  heroParagraph
                  fiftyFifty1 {
                    title
                    paragraph
                    image {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                    cta {
                      target
                      title
                      url
                    }
                  }
                
                  gallery {
                    caption
                    image {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                    title
                  }
                  schoolLocatorCta {
                    image {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                    paragraph
                  }
                  testimonials {
                    headline
                    name
                    testimonial
                    title
                    testimonialImage {
                      altText
                      mediaItemUrl
                      sourceUrl
                    }
                  }
                  marketCenter {
                    latitude
                    longitude
                  }
                  careerplugSchoolId
                    careersFiftyFifty1 {
                        cta {
                        target
                        title
                        url
                        }
                        image {
                        altText
                        mediaItemUrl
                        sourceUrl
                        }
                        paragraph
                        title
                    }
                    careersHero {
                        heroDisclaimer
                        heroImage{
                            altText
                            mediaItemUrl
                            sourceUrl
                        }
                        heroParagraph
                    }
                    testimonialsSectionDescription
                    testimonialsSectionTitle
                    careersTestimonials {
                        name
                        testimonial
                        title
                        testimonialImage {
                        altText
                        mediaItemUrl
                        sourceUrl
                        }
                    }
                    schoolBenefitsSection {
                        benefits {
                            paragraph
                            title,
                        
                            icon {
                                altText
                                mediaItemUrl
                                sourceUrl
                            }
                        }
                        cta {
                            target
                            title
                            url
                        }
                        headline
                        paragraph
                        image{
                            altText
                            mediaItemUrl
                            sourceUrl
                        }
                    }
                }
            }
            siteSettings {
                siteSettings {
                  headerImage {
                    altText
                    sourceUrl
                  }
                  benefitsImage {
                    sourceUrl
                    altText
                  }
                  developYourCareerImage {
                    sourceUrl
                    altText
                  }
                }
            }
        }
        `;

  const locationData = await client.query({ query: GET_LOCATION });
  let seoData = { title: null, description: null };

  if (!locationData.data.market?.marketSettings?.seo?.title) {
    seoData.title = `Careers - Daycare and Childcare in the ${locationData.data.market?.name} Area | Primrose Schools | The Leader in Early Education and Care`;
    seoData.description = `Our private preschools located in ${locationData.data.market?.name} offer premier daycare and childcare services for families. Learn why parents choose Primrose.`;
  } else {
    seoData = locationData.data.market.marketSettings.seo;
  }
  return {
    props: {
      locationData: locationData,
      locationsSeo: seoData,
    },
  };
}

/*   export async function getStaticPaths() {
    const allLocations  = await getAllLocations();;
    const paths = allLocations.map((item) => ({
        params: { slug: [item.node.slug] },
      }));
    return {
      paths,
      fallback: 'blocking',
    };
  }
   */
