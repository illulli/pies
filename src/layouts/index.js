import React from "react"
//import { Link } from "gatsby"
import Helmet from "react-helmet"
import Transition from "./../components/Transition.js"
import Header from './../components/header.js';
import { StaticQuery, graphql } from 'gatsby';
import styled, {ThemeProvider} from 'styled-components';
import CookieConsent from "react-cookie-consent";
import SEO from './../components/social/SEO.js';

import './../components/animations/slides.css';
import './../components/animations/fades.css';
import './../components/icons/icons.css';
import './../components/styles/text.css';
import "./layout.css"
import theme from './theme.js';

const TemplateWrapper = (props) => {
    let { children, location, data} = props;
   // console.log(`TemplateWrapper data`, props);
    return (
        <StaticQuery
              query={graphql`
                query LayoutStaticQuery {
                    site {
                        ...SiteInformation
                      }
                      headerImage: file(relativePath: { regex: "/restaurant/" }) {
                        childImageSharp  {
                            fluid(sizes: "100vw"){
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
              `}
              render={stat => {
                  console.log(`StaticQuery`, stat);
                  return(
                    <ThemeProvider theme={theme}>
                        <WebsiteWrapper>
                            <Helmet
                                title={stat.site.siteMetadata.title}
                                meta={[
                                { name: `description`, content: `Sample` },
                                { name: `keywords`, content: `sample, something` }
                                ]}
                            >
                            </Helmet>
                            <CookieConsent
                                location="top"
                                buttonText="Okay"
                                cookieName="gekko-cookie-consent"
                                style={{ background: "rgba(0,0,0,0.7)",  zIndex: '999999' }}
                                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                                expires={150}
                            >
                                This website uses cookies to enhance its service to you.
                            </CookieConsent>
                            <Header siteTitle={stat.site.siteMetadata.title} 
                                        image={data && data.headerImage? data.headerImage.childImageSharp.fluid:
                                        stat.headerImage.childImageSharp?stat.headerImage.childImageSharp.fluid:null} />
                            <SEO />
                            <div
                                style={{
                                margin: `0 auto`,
                                maxWidth: 880,
                                padding: `0px 1.0875rem 1.45rem`,
                                paddingTop: '150px',
                                }}
                            >
                            
                                <Transition location={location}>{children}</Transition>
                            </div>
                        </WebsiteWrapper>       
                    </ThemeProvider>
                )
        }}/> //end of StaticQuiry
      )
}

export default TemplateWrapper

const WebsiteWrapper = styled.div`
    max-width: 100%;
`
/*  overflow-x: hidden;
           {data && data.site && <Header siteTitle={data.site.siteMetadata.title} 
                    image={data.mapImage?
                        data.mapImage.childImageSharp.fluid
                        :data.headerImage.childImageSharp.fluid} />}
*/