import gql from "graphql-tag";
import { client } from "../lib/apollo";

const GET_ALL_RESOURCE_TYPES = gql`
  query GET_ALL_RESOURCE_TYPES {
    resourceTypes {
      edges {
        node {
          id
          slug
          uri
        }
      }
    }
  }
`;

const GET_ALL_RESOURCE_TAGS = gql`
  query GET_ALL_RESOURCE_TAGS {
    resourceTags {
      edges {
        node {
          id
          slug
          uri
        }
      }
    }
  }
`;

const RESOURCES_QUERY = gql`
  query GetResources {
    resources(first: 1500) {
      nodes {
        id
        title
        excerpt
        slug
        uri
        date
        newsFields {
          link
        }
        resourceTypes(first: 3) {
          nodes {
            uri
            slug
            name
          }
        }
        resourceTags(first: 3) {
          nodes {
            uri
            slug
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;
const RESOURCES_SETTINGS_QUERY = gql`
  query GetResourceSettings {
    seo {
      contentTypes {
        resource {
          archive {
            fullHead
          }
        }
      }
    }
    resourcesSettings {
      resourceSettings {
        featuredResources {
          ... on Resource {
            id
            title
            uri
            slug
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            excerpt
            date
            resourceFields {
              content
              displayAuthor
              fieldGroupName
            }
            resourceTags {
              nodes {
                slug
                link
                uri
                name
              }
            }
            resourceTypes {
              nodes {
                slug
                uri
                name
                link
              }
            }
          }
        }
        hideTagFromSearch {
          ... on Resource {
            id
            title
            uri
            slug
          }
        }
      }
    }
  }
`;

const RESOURCES_BY_TYPE_QUERY = gql`
  query GetResources($resourceType: ID = "") {
    resourceType(id: $resourceType, idType: SLUG) {
      seo {
        fullHead
      }
      resources(first: 2000) {
        nodes {
          id
          title
          excerpt
          slug
          uri
          date
          newsFields {
            link
          }
          resourceTypes(first: 1500) {
            nodes {
              uri
              slug
              name
            }
          }
          resourceTags(first: 1500) {
            nodes {
              uri
              slug
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    resourceTags(first: 1500) {
      nodes {
        uri
        slug
        name
      }
    }
    resourcesSettings {
      resourceSettings {
        featuredResources {
          ... on Resource {
            id
            title
            uri
            slug
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            excerpt
            date
            resourceFields {
              content
              displayAuthor
              fieldGroupName
            }
            resourceTags {
              nodes {
                slug
                link
                uri
                name
              }
            }
            resourceTypes {
              nodes {
                slug
                uri
                name
                link
              }
            }
          }
        }
        hideTagFromSearch {
          ... on Resource {
            id
            title
            uri
            slug
          }
        }
      }
    }
  }
`;

const RESOURCES_BY_TAG_QUERY = gql`
  query GetResources($resourceTag: ID = "") {
    resourceTag(id: $resourceTag, idType: SLUG) {
      seo {
        fullHead
      }
      resources(first: 2000) {
        nodes {
          id
          title
          excerpt
          slug
          uri
          date
          newsFields {
            link
          }
          resourceTypes(first: 1500) {
            nodes {
              uri
              slug
              name
            }
          }
          resourceTags(first: 1500) {
            nodes {
              uri
              slug
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
    resourceTags(first: 1500) {
      nodes {
        uri
        slug
        name
      }
    }

    resourcesSettings {
      resourceSettings {
        featuredResources {
          ... on Resource {
            id
            title
            uri
            slug
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            excerpt
            date
            resourceFields {
              content
              displayAuthor
              fieldGroupName
            }
            resourceTags {
              nodes {
                slug
                link
                uri
                name
              }
            }
            resourceTypes {
              nodes {
                slug
                uri
                name
                link
              }
            }
          }
        }
      }
    }
  }
`;

const FILTER_TERMS_QUERY = gql`
  query GetFilterTerms {
    resourceTags(first: 500) {
      nodes {
        name
        slug
        children(first: 500) {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export async function getAllResources() {
  const data = await client.query({
    query: RESOURCES_QUERY,
  });
  const resources = data;

  return resources;
}
export async function getResourceSettings() {
  const data = await client.query({
    query: RESOURCES_SETTINGS_QUERY,
  });
  const settings = data;
  return settings;
}
export async function getAllFilters() {
  const data = await client.query({
    query: FILTER_TERMS_QUERY,
  });

  return data;
}
export async function getAllResourceURIs() {
  const data = await client.query({
    query: GET_ALL_RESOURCE_TYPES,
  });
  const resources = data?.data.resourceTypes?.edges;
  return resources;
}
export async function getAllTagURIs() {
  const data = await client.query({
    query: GET_ALL_RESOURCE_TAGS,
  });
  const resources = data?.data.resourceTags?.edges;
  return resources;
}
export async function getResourcesByType(slug) {
  const data = await client.query({
    query: RESOURCES_BY_TYPE_QUERY,
    variables: {
      resourceType: slug,
    },
  });
  return data;
}
export async function getResourcesByTag(slug) {
  const data = await client.query({
    query: RESOURCES_BY_TAG_QUERY,
    variables: {
      resourceTag: slug,
    },
  });
  return data;
}
