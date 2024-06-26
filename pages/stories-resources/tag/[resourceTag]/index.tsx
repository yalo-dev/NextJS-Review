import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Heading from "../../../../app/components/atoms/Heading/Heading";
import { ResourceFilter } from "../../../../app/components/filters/ResourceFilter";
import Pagination from "../../../../app/components/molecules/Pagination/Pagination";
import ResourceBanner from "../../../../app/components/organisms/ResourceBanner/ResourceBanner";
import ResourceCard from "../../../../app/components/organisms/ResourceCard/ResourceCard";
import {
  getAllFilters,
  getAllTagURIs,
  getResourcesByTag,
} from "../../../../app/lib/resources";
import getResourceMenu from "../../../../queries/getResourceMenu";

interface FeaturedResource {
  id: string;
  title: string;
}

export async function getStaticPaths() {
  const resources = await getAllTagURIs();
  const dynamicResources = resources.filter((el) => el?.node.uri.length > 1);
  const paths = dynamicResources.map((resource) => {
    let slug = resource.node.slug;
    let uri = resource.node.uri;
    return {
      params: {
        resourceTag: slug,
        slug: slug,
        uri: uri,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { resourceTag } = params;
  const resourceMenu = await getResourceMenu();
  try {
    const [resourceData, filterTermsData] = await Promise.all([
      getResourcesByTag(resourceTag),
      getAllFilters(),
    ]);
    return {
      props: {
        resourceMenu,
        slug: resourceTag,
        resources: resourceData.data,
        featured:
          resourceData.data.resourcesSettings.resourceSettings
            .featuredResources,
        filterTerms: filterTermsData.data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      props: {
        slug: resourceTag,
        resources: [],
        featured: [],
        filterTerms: [],
      },
      revalidate: 60,
    };
  }
}

export default function CategoryComponent({
  slug,
  resources,
  featured,
  filterTerms,
}) {
  // TODO: move filtering and pagination to server - SHOULD USE URL SEARCH PARAMS AS STATE
  // TODO: The filtering and pagination is done client-side. This is affecting performance, but filtering resource by resourceType is not currently available and will need to be added on the backend manually
  const router = useRouter();
  const { category } = router.query;

  const [categoryResources, setCategoryResources] = useState([]);

  const [tagResources, setTagResources] = useState([]);

  const [featuredResources, setFeaturedResources] =
    useState<FeaturedResource[]>(featured);

  const featuredResourceIds =
    featuredResources?.length > 0 ? featuredResources?.map((fr) => fr.id) : [];

  const [currentPage, setCurrentPage] = useState<number>(1);

  const toProperCase = (str) => {
    return str
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const slugToTitleMap = {
    families: "Family Resources",
    educators: "Educator Resources",
    newsroom: "News",
  };

  const getTitleFromSlug = (slug: string) => {
    return slugToTitleMap[slug] || toProperCase(slug);
  };

  let isTagPage = false;
  //console.log(resources);
  useEffect(() => {
    if (resources && slug) {
      //if the resource tag is the same as the page slug, then it is a tag page
      const resourceTag = resources.resourceTags.nodes.find(
        (tag) => tag.slug === slug,
      );
      let tagCheck = resourceTag?.slug === slug;
      if (tagCheck) isTagPage = tagCheck;

      if (isTagPage) {
        const categorySpecificResources =
          resources.resourceTag.resources.nodes.filter((resource) =>
            resource.resourceTags.nodes.some((type) => type.slug === slug),
          );
        setCategoryResources(categorySpecificResources);
        isTagPage = true;
      } else {
        const categorySpecificResources =
          resources.resourceType.resources.nodes.filter((resource) =>
            resource.resourceTypes.nodes.some((type) => type.slug === slug),
          );
        setCategoryResources(categorySpecificResources);
      }

      const featuredInCategory =
        resources.resourcesSettings.resourceSettings.featuredResources
          ?.filter((featured) =>
            featured.resourceTypes.nodes.some((type) => type.slug === slug),
          )
          .slice(0, 2);

      setFeaturedResources(featuredInCategory);
    }
  }, [resources, slug]);

  const { filteredResources, SearchAndFilterUI } = ResourceFilter(
    categoryResources,
    filterTerms,
    slug,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredResources]);

  const resourcesPerPage = 9;
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(
    indexOfFirstResource,
    indexOfLastResource,
  );

  const currentResourcesMapped = currentResources.map((resource) => ({
    ...resource,
    isFeatured: featuredResourceIds.includes(resource.id),
  }));

  const renderResourceList = (
    resourceList,
    showFeaturedImage = true,
    additionalClassName = "",
    isFeatured = false,
  ) => (
    <div className="gap d-flex flex-wrap">
      {resourceList.map((resource, index) => {
        const categoryFirstNode = resource?.resourceTypes?.nodes[0];
        const category = categoryFirstNode?.slug;
        const link =
          resource?.newsFields?.link != null
            ? resource?.newsFields?.link
            : `/stories-resources/${category}/${resource.slug}`;
        return (
          <ResourceCard
            key={`${resource.title}-${index}`}
            resource={resource}
            showFeaturedImage={showFeaturedImage}
            className={`${additionalClassName}`}
            featuredResourceIds={featuredResourceIds}
            isFeatured={isFeatured}
            customLink={link}
          />
        );
      })}
    </div>
  );

  return (
    <div className="container category">
      <div className="resources-container">
        {featuredResources?.length > 0
          ? renderResourceList(featuredResources, true, "featured", true)
          : ""}
      </div>
      <ResourceBanner slug={slug} />
      <div id="all" className="resources-container">
        <div className="title-and-search-container">
          <div className="title-container">
            <Heading level="h2" className="title">
              Browse All {slug ? getTitleFromSlug(slug) : "Stories & Resources"}
            </Heading>
          </div>
          {SearchAndFilterUI}
        </div>
        {currentResourcesMapped && currentResourcesMapped.length > 0 ? (
          renderResourceList(currentResourcesMapped, true, "medium")
        ) : (
          <p>No Resources Found</p>
        )}
      </div>
      <Pagination
        controller={{ page: currentPage, setPage: setCurrentPage }}
        itemCount={filteredResources?.length}
        perPage={resourcesPerPage}
      />
    </div>
  );
}
