import { client } from '../../app/lib/apollo';
import { gql } from '@apollo/client';
import Link from 'next/link';

export async function getStaticProps() {

    const GET_SCHOOLS = gql`
    query GetSchools {
        schools {
          nodes {
            uri
            schoolSettings {
                details {
                    corporate {
                        schoolName
                      }
                }
              
            }
            schoolCorporateSettings {
                schoolName
              }
          }
        }
      }
  `;

    const response = await client.query({ query: GET_SCHOOLS });
    const schools = response?.data?.schools?.nodes;

    return {
        props: {
            schools,
        },
    };
}

export default function Schools({ schools }) {
    return (
        <section className='module pt-4 pb-4'>
            <div className='container'>
                <div className='row'>
                    <h1 className='title'>
                        Schools
                    </h1>
                    <div className=''>
                        {
                            schools.map((school, index) => {
                                const schoolName = school.schoolCorporateSettings?.schoolName;
                                return (
                                    <div className='card p-2' key={school.uri}>
                                         <a href={`${school.uri}`}>
                                            <h2>{schoolName || 'No School Name'}</h2>
                                        </a>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}
