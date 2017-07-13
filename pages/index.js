import Head from 'next/head'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ReactDisqusThread from 'react-disqus-thread'

const hilight = '#48f'
const possesive = {
    m: 'his',
    f: 'her',
}

const Vote = ({vote}) => vote ? <span className="yes" style={{color:'green'}}>YES</span> : <span className="no" style={{color:'red'}}>NO</span>

const Header = ({senator, title, vote, number, party, state}) => <div className='header'>
{/*    <div className="creator">
        <div className="avatar"></div>
        <div>By <b>Romina Nikolić</b></div>
        <div>First created</div>
    </div>
*/}
    <div>
        <h1>Senator {senator} <span className='number'>({party}-{state})</span>,</h1>
        <h1>Vote <Vote vote={vote}/> on the <span className="title">{title}</span><span className="number">({number})</span></h1>
    </div>
    <style jsx>{`
        .header {
            display: flex;
            align-items: center;
        }

        .creator {
            text-align: center;
        }

        .avatar {
            display: inline-block;
            padding: 40px;
            background: #eee;
        }



        .title {
            margin-right: 10px;
        }

        .number {
            opacity: .5;
        }
    `}</style>
</div>

const Progress = ({percent}) => <div className='progress'>
    <div style={{width: percent + '%'}}></div>
    <style jsx>{`
        .progress {
            height: 4px;
            background: #eee;
        }

        .progress > div {
            background: ${hilight};
            height: 100%;
        }
    `}</style>
</div>

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript#2901298
const withcommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const Actions = ({pledged, goal, backers, daysleft, senator, vote, sex, number}) => <div className="actions">
    <Progress percent={pledged / goal * 100} />
    <div className="metric">
        <div className="metric-num raised">${withcommas(pledged)}</div>
        <div className="metric-num-desc">pledged of ${withcommas(goal)} goal</div>
    </div>
    <div className="metric">
        <div className="metric-num">{backers}</div>
        <div className="metric-num-desc">backers</div>
    </div>
    <div className="metric">    
        <div className="metric-num">{daysleft}</div>
        <div className="metric-num-desc">days to go</div>
    </div>
    <div className="back">Buy this vote</div>
    <div className="semibacks">
        <div className="remind">Remind Me</div>
        <div className="share">Share</div>
    </div>
    <div className="info">
        <b><u>Conditional Donation.</u></b> If {senator} votes {vote ? 'YES' : 'NO'} on {number}, the total amount raised (less processing fees) will be donated to {possesive[sex]} reelection campaign. If {senator} votes {!vote ? 'YES' : 'NO'} on {number}, all donations will be refunded.
    </div>
    <style jsx>{`
        .actions {
            padding-left: 40px;
            width: 400px;
            margin-top: 57px;
        }
        .metric {
            margin: 20px 0;
        }
        .metric-num {
            font-size: 200%;
        }
        .raised {
            color: ${hilight};
        }
        .metric-num-desc {
            opacity: .5
        }
        .back {
            padding: 20px 0;
            text-align: center
            background: ${hilight};
            color: #fff;
            border-radius: 5px;
        }
        .semibacks {
            display: flex;
            margin-top: 20px;
        }
        .semibacks > div {
            flex: 1;
            text-align: center;
            padding: 20px 0;
            background: #eee;
            border-radius: 5px;
        }
        .remind {
            margin-right: 5px;
        }
        .info {
            margin: 10px 0;
            font-size: 80%;
            opacity: .5;
        }
    `}</style>
</div>

    
const Overview = ({senator, title, vote, pledged, backers, summary, summarySource}) => <div className='overview'>
    <p>Senator <b>{senator}</b>,</p>
    <p>We the people of the United States of America demand that you vote <Vote vote={vote}/> on the <b>{title}</b>, the summary of which is as follows:</p>
    <blockquote>{summary} <span className="summary-source">({summarySource})</span></blockquote>
    <p>If you faithfully represent us by voting <Vote vote={vote}/> on the <b>{title}</b>, we have pledged to donate the sum of <span className="amount">${withcommas(pledged)}</span> to your next reelection campaign.</p>
    <p>Yours Sincerely,</p>
    <p><b>{backers} United States Citizens</b></p>
    <style jsx>{`
        .summary-source {
            opacity: .5;
        }
        .overview {
            line-height: 150%;
            opacity: .9;
            padding: 20px;
        }
        .amount {
            color: ${hilight};
        }

    `}</style>
</div>

            
const Bill = ({billText}) => <pre>
    {billText}
    <style jsx>{`
        pre {
            padding: 20px;
            max-height: 400px;
            overflow: scroll;
            padding: 20px;
            margin: 0;
            box-sizing: border-box;
        }
    `}</style>
</pre>


const ContentTabs = ({summary, senator, vote, title, summarySource, billText, pledged, backers, senatorInfo}) => <div className="tabs">
    <Tabs selectedTabClassName='active' selectedTabPanelClassName='tab-panel'>
        <TabList className='tab-list'>
            <Tab>Overview</Tab>
            <Tab>Bill Text</Tab>
            <Tab>Senator Information</Tab>
        </TabList>

        <TabPanel>
            <Overview
                senator={senator}
                title={title}
                vote={vote}
                pledged={pledged}
                backers={backers}
                summary={summary}
                summarySource={summarySource}
            />
        </TabPanel>
        <TabPanel>
            <Bill billText={billText}/>
        </TabPanel>
        <TabPanel>
            <iframe src={senatorInfo}></iframe>
        </TabPanel>
    </Tabs>
    <style jsx global>{`
        .tab {
            background: red;
        }
        .tab-list {
            display: flex;
            margin: 0;
            padding: 0;
            border-bottom: 1px solid #eee;
            height:60px;
        }
        .tab-list li {
            display: block;
            padding: 20px;
            cursor: pointer;
        }
        .tab-list li.active {
            border-bottom: 2px solid ${hilight};
        }
        iframe {
            border: 0;
            width: 100%;
            height: 400px;
        }
    `}</style>    
</div>



const Pitch = () => <div className='pitch'>
    <div className="content">
        <ContentTabs 
            senator="Robert Aderholt"
            title='Securing our Agriculture and Food Act'
            summary='H.R. 1238 amends the Homeland Security Act of 2002 to authorize a program to coordinate the Department of Homeland Security’s efforts related to food, agriculture, and veterinary defense from acts of terrorism and other high-consequence events that pose a risk to homeland security.'
            billText={billText}
            pledged={49249}
            backers={701}
            senatorInfo="https://en.m.wikipedia.org/wiki/Robert_Aderholt"
            summarySource="Republican Policy Committee"
            />
    </div>
    <Actions 
        pledged={49249}
        goal={87000}
        backers={701}
        sex='m'
        number='H.R. 1238'
        senator="Robert Aderholt"
        daysleft={4}/>
    <style jsx>{`
        .content {
            flex: 1
        }
        .pitch {
            display: flex
        }
    `}</style>
</div>  

class Body extends React.Component {
    componentDidMount(){
        /*
        window.disqus_config = function () {
            this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        }
        */
        var d = document, s = d.createElement('script');
        s.src = 'https://conditionaldonations.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s)
    }

    render(){

        const {number, senator} = this.props
        console.log(number+"-"+senator)

        return <div className='body'>
        <div id="disqus_thread"></div>

        <style jsx global>{`
            .body {
                // border-top: 1px solid #eee;
                margin-top: 40px;
            }
            #disqus_thread {
                margin:auto;
                width: 1100px;
            }
        `}</style>    
    </div>
    }
}

const Title = () => <div className='title'>
    <div className='item'>Explore</div>
    <div className='item'>About</div>
    <div className='item logo'>LOBBY<span className="together">TOGETHER</span></div>
    <div className='spacer'></div>
    <div className='item'>Log in</div>
    <div className='item'>Sign up</div>
    <style jsx>{`
        .title {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            background: #fff;
        }
        .item.logo {
            position: absolute;
            left: 50%;
            transform: translate(-50%,0);
            font-size: 20px;
            padding: 19px;
        }
        .spacer { 
            flex: 1;
        }
        .together {
            color: ${hilight}
        }
        .item{ 
            padding: 20px;
            font-weight: bold;
            opacity: .7;
            cursor: pointer;
        }
    `}</style>
</div>

export default () => <div className="app">
    <Title/>
    <div className="wrap">
        <Header 
            senator="Robert Aderholt"
            party="R"
            state="AL"
            number='H.R. 1238'
            title='Securing our Agriculture and Food Act'/>
        <Pitch/>
    </div>
    <Body/>
    <style jsx global>{`
        body {
            margin: 0;
            background: #f5f5f5;
        }
        .app {
            font-family: Helvetica;
        }
        .wrap {
            width: 1100px;
            margin: auto;
        }

    `}</style>
</div>










const billText = `[Congressional Bills 115th Congress]
[From the U.S. Government Publishing Office]
[H.R. 1238 Enrolled Bill (ENR)]

        H.R.1238

                     One Hundred Fifteenth Congress

                                 of the

                        United States of America


                          AT THE FIRST SESSION

          Begun and held at the City of Washington on Tuesday,
          the third day of January, two thousand and seventeen


                                 An Act


 
    To amend the Homeland Security Act of 2002 to make the Assistant 
   Secretary of Homeland Security for Health Affairs responsible for 
coordinating the efforts of the Department of Homeland Security related 
to food, agriculture, and veterinary defense against terrorism, and for 
                             other purposes.

    Be it enacted by the Senate and House of Representatives of the 
United States of America in Congress assembled,
SECTION 1. SHORT TITLE.
    This Act may be cited as the "Securing our Agriculture and Food 
Act".
SEC. 2. COORDINATION OF FOOD, AGRICULTURE, AND VETERINARY DEFENSE 
AGAINST TERRORISM.
    (a) In General.--Title V of the Homeland Security Act of 2002 (6 
U.S.C. 311 et seq.) is amended by adding at the end the following new 
section:
    "SEC. 528. COORDINATION OF DEPARTMENT OF HOMELAND SECURITY EFFORTS 
      RELATED TO FOOD, AGRICULTURE, AND VETERINARY DEFENSE AGAINST 
      TERRORISM.
    "(a) Program Required.--The Secretary, acting through the 
Assistant Secretary for Health Affairs, shall carry out a program to 
coordinate the Department's efforts related to defending the food, 
agriculture, and veterinary systems of the United States against 
terrorism and other high-consequence events that pose a high risk to 
homeland security.
    "(b) Program Elements.--The coordination program required by 
subsection (a) shall include, at a minimum, the following:
        "(1) Providing oversight and management of the Department's 
    responsibilities pursuant to Homeland Security Presidential 
    Directive 9-Defense of United States Agriculture and Food.
        "(2) Providing oversight and integration of the Department's 
    activities related to veterinary public health, food defense, and 
    agricultural security.
        "(3) Leading the Department's policy initiatives relating to 
    food, animal, and agricultural incidents, and the impact of such 
    incidents on animal and public health.
        "(4) Leading the Department's policy initiatives relating to 
    overall domestic preparedness for and collective response to 
    agricultural terrorism.
        "(5) Coordinating with other Department components, including 
    U.S. Customs and Border Protection, as appropriate, on activities 
    related to food and agriculture security and screening procedures 
    for domestic and imported products.
        "(6) Coordinating with appropriate Federal departments and 
    agencies.
        "(7) Other activities as determined necessary by the 
    Secretary.
    "(c) Rule of Construction.--Nothing in this section may be 
construed as altering or superseding the authority of the Secretary of 
Agriculture or the Secretary of Health and Human Services.".
    (b) Clerical Amendment.--The table of contents in section 1(b) of 
the Homeland Security Act of 2002 is amended--
        (1) by striking the items relating to sections 523, 524, 525, 
    526, and 527; and
        (2) by inserting after the item relating to section 522 the 
    following:

"Sec. 523. Guidance and recommendations.
"Sec. 524. Voluntary private sector preparedness accreditation and 
          certification program.
"Sec. 525. Acceptance of gifts.
"Sec. 526. Integrated public alert and warning system modernization.
"Sec. 527. National planning and education.
"Sec. 528. Coordination of Department of Homeland Security efforts 
          related to food, agriculture, and veterinary defense against 
          terrorism.".


                               Speaker of the House of Representatives.

                            Vice President of the United States and    
                                               President of the Senate.`