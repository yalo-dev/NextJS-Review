import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Heading from "../../../../app/components/atoms/Heading/Heading";

interface ResourceType {
  slug: string;
  name: string;
}

interface ResourceTagType {
  slug: string;
  name: string;
}

interface Resource {
  resourceTags: {
    nodes: ResourceTagType[];
  };
}

const GET_NEWS_ITEM = gql`
  query GetNewsItem($schoolSlug: ID!) {
    school(id: $schoolSlug, idType: URI) {
      title
      seo {
        fullHead
      }
      schoolAdminSettings {
        newsItems {
          content
          expires
          image {
            sourceUrl
            mediaItemUrl
          }
          title
          slug
          shortDescription
          publishDate
          imageAlt
        }
      }
    }
  }
`;

const calculateReadingTime = (text) => {
  const words = text.split(/\s+/g).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export default function SchoolNewsItem() {
  const router = useRouter();
  const { schoolSlug, newsSlug } = router.query;
  const { loading, error, data, refetch } = useQuery(GET_NEWS_ITEM, {
    variables: { schoolSlug: schoolSlug, newsSlug: newsSlug },
  });

  if (loading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;

  const school = data.school;
  const newsItems = school.schoolAdminSettings.newsItems;
  let news = [];
  newsItems.forEach((newsItem) => {
    news[newsItem.slug] = newsItem;
  });
  const newsItem = news[newsSlug as string];
  console.log(newsItem);

  if (!newsItem) return { notFound: true };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(newsItem.publishDate));

  const readingTime = newsItem.content
    ? calculateReadingTime(newsItem.content.replace(/(<([^>]+)>)/gi, ""))
    : "";

  const wrapIframesInResponsiveDiv = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const iframes = doc.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
      const wrapper = doc.createElement("div");
      wrapper.className = "responsive-video";
      iframe.parentNode?.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });

    return doc.body.innerHTML;
  };

  let wrappedContent = newsItem.content
    ? wrapIframesInResponsiveDiv(newsItem.content)
    : "";

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Head>
        <title>
          {newsItem.title} | Primrose School of {school.title}
        </title>
        {newsItem?.shortDescription && (
          <meta name={"description"} content={newsItem?.shortDescription} />
        )}
      </Head>
      <div className="resource school-news">
        <div className="resource-content p-3 p-lg-0 mx-auto">
          <div className="container">
            <a href={`/schools/${schoolSlug}`}>&larr; Back To Home</a>
          </div>
          <div className="image-wrapper position-relative overflow-hidden pb-lg-0">
            {newsItem?.image?.sourceUrl && (
              <Image
                width={1920}
                height={1920}
                src={newsItem.image.sourceUrl}
                alt={newsItem?.imageAlt}
              />
            )}
          </div>

          <div className="hero">
            <div className="caption">
              {newsItem.publishDate && (
                <div className="date mb-0">
                  <p className="b1 mb-0">{formattedDate}</p>
                </div>
              )}
            </div>
            {newsItem.title && (
              <div className="title pt-2 pb-2">
                <Heading level="h1">{newsItem.title}</Heading>
              </div>
            )}
          </div>

          {newsItem.content && (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: wrappedContent }}
            ></div>
          )}

          <div className="divider-line"></div>
          <div className="social d-flex justify-content-start align-items-center">
            <h5 className="m-0">Share: </h5>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 10.0612C20 4.50444 15.5231 0 10.0013 0C4.47694 0.00124984 0 4.50444 0 10.0625C0 15.0831 3.65704 19.2451 8.43645 20V12.9696H5.89926V10.0625H8.43895V7.84402C8.43895 5.32309 9.93251 3.93076 12.216 3.93076C13.3108 3.93076 14.4544 4.12698 14.4544 4.12698V6.60168H13.1934C11.9523 6.60168 11.5648 7.37783 11.5648 8.17398V10.0612H14.337L13.8945 12.9684H11.5636V19.9988C16.343 19.2438 20 15.0819 20 10.0612Z"
                  fill="black"
                />
              </svg>
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(newsItem.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C4.47711 0 0 4.47711 0 10C0 15.5229 4.47711 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47711 15.5229 0 10 0ZM12.4516 15.6676L9.12311 11.2171L5.00356 15.6676H3.94467L8.65 10.5844L3.97422 4.33244H7.578L10.6433 8.43111L14.4371 4.33244H15.496L11.1164 9.064L16.0553 15.6676H12.4516Z"
                  fill="black"
                />
              </svg>
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0798 18.7316C23.1319 18.7321 23.1835 18.7222 23.2315 18.7026C23.2795 18.683 23.3228 18.6541 23.3587 18.6176C23.3947 18.5811 23.4225 18.5379 23.4404 18.4906C23.4584 18.4433 23.4661 18.3929 23.4631 18.3426C23.4631 18.0667 23.2911 17.9349 22.9383 17.9349H22.3681V19.3793H22.5825V18.7497H22.8461L22.8521 18.7573L23.261 19.3793H23.4904L23.0504 18.7356L23.0798 18.7316ZM22.8318 18.5869H22.5832V18.0986H22.8983C23.0612 18.0986 23.2468 18.1243 23.2468 18.3306C23.2468 18.5679 23.0602 18.5869 22.8318 18.5869ZM17.4861 16.9214H14.4453V12.3128C14.4453 11.2139 14.425 9.79915 12.8638 9.79915C11.28 9.79915 11.0377 10.9965 11.0377 12.2328V16.9211H7.99694V7.44396H10.9161V8.73912H10.9569C11.2491 8.25571 11.6712 7.85803 12.1784 7.58845C12.6856 7.31886 13.2589 7.18746 13.8371 7.20823C16.9191 7.20823 17.4873 9.17012 17.4873 11.7224L17.4861 16.9214ZM4.56592 6.1485C4.21692 6.14856 3.87573 6.04846 3.58551 5.86086C3.29529 5.67326 3.06906 5.40659 2.93545 5.09456C2.80183 4.78253 2.76682 4.43916 2.83485 4.10787C2.90287 3.77659 3.07088 3.47226 3.31762 3.23339C3.56436 2.99451 3.87875 2.83181 4.22104 2.76585C4.56333 2.6999 4.91813 2.73365 5.2406 2.86286C5.56306 2.99206 5.83869 3.2109 6.03264 3.4917C6.22659 3.77251 6.33015 4.10267 6.33021 4.44043C6.33025 4.6647 6.28465 4.88678 6.19601 5.09399C6.10737 5.3012 5.97742 5.48949 5.81359 5.64809C5.64976 5.8067 5.45526 5.93253 5.24118 6.01839C5.02711 6.10425 4.79765 6.14846 4.56592 6.1485ZM6.08631 16.9214H3.04236V7.44396H6.08631V16.9214ZM19.002 0.000127477H1.51437C1.11745 -0.00420749 0.73499 0.144141 0.45103 0.412574C0.16707 0.681006 0.00484419 1.04756 0 1.43169V18.4262C0.0046784 18.8106 0.166801 19.1774 0.450751 19.4461C0.734701 19.7148 1.11726 19.8634 1.51437 19.8593H19.002C19.3999 19.8642 19.7836 19.716 20.0686 19.4473C20.3537 19.1786 20.5169 18.8113 20.5224 18.4262V1.43047C20.5167 1.04557 20.3534 0.678602 20.0683 0.410176C19.7833 0.14175 19.3997 -0.00494879 19.002 0.000127477Z"
                  fill="black"
                />
                <path
                  d="M22.8576 17.2914C22.4877 17.2948 22.1342 17.4399 21.8744 17.6949C21.6147 17.9499 21.4699 18.2941 21.4717 18.6521C21.4735 19.0102 21.6217 19.353 21.8839 19.6056C22.1462 19.8582 22.5011 20 22.8711 20C23.241 20 23.596 19.8582 23.8582 19.6056C24.1205 19.353 24.2687 19.0102 24.2704 18.6521C24.2722 18.2941 24.1274 17.9499 23.8677 17.6949C23.608 17.4399 23.2545 17.2948 22.8845 17.2914H22.8576ZM22.8576 19.8449C22.615 19.8488 22.3765 19.783 22.1725 19.6558C21.9685 19.5285 21.8081 19.3456 21.7115 19.1302C21.6149 18.9147 21.5865 18.6763 21.6299 18.4453C21.6732 18.2142 21.7865 18.0007 21.9552 17.8319C22.1239 17.6631 22.3406 17.5464 22.5778 17.4968C22.815 17.4471 23.0621 17.4667 23.2878 17.5529C23.5136 17.6392 23.7078 17.7883 23.846 17.9814C23.9842 18.1745 24.0601 18.4029 24.0641 18.6377V18.6577C24.0709 18.9657 23.951 19.2638 23.7307 19.4863C23.5105 19.7089 23.2079 19.8376 22.8896 19.8443H22.8579"
                  fill="black"
                />
              </svg>
            </Link>
          </div>
          <div className="divider-line divider-line-bottom"></div>
        </div>
      </div>
    </>
  );
}
