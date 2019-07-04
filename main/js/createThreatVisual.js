function createThreatVisual() {

    //Constants
    const pi = Math.PI
    const pi2 = Math.PI * 2
    const pi1_2 = Math.PI / 2

    //Sizes
    let base_size = 1600
    let width = 1600, height = 1600
    let total_width, total_height
    let margin = {
        top: -100,
        right: 50,
        bottom: -100,
        left: 50
    }

    //Containers SVG
    let svg, g
    let g_scale

    //Containers canvas
    let canvas_edges, canvas_nodes, canvas_hover
    let ctx_edges, ctx_nodes, ctx_hover
    let sf = 2 //canvas scale factor
    let sf_original = sf
    let sf_set = false
    let sf_set_original = sf_set

    //Data
    let nodes
    let elements
    let concepts
    let language
    let edges
    let edges_concepts = [], edges_elements = []

    //Mappings
    let node_by_id = {}
    let linked_to_id = {}
    let threat_by_id = {}
    let concept_by_id = {}
    let edge_concept_by_id = {}
    // let edge_element_by_id = {}

    //Threats metadata
    // const threat_metadata = [
    //     { id: "vocabulary_ich_1265",
    //         color: "#EFB605",
    //         megatrend_relevance: 99,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59b44bf940147abd176f/bd23aebc60a9a4c2609da37a9e8accf8/background-balance-beach-289586.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59b44bf940147abd176f/bd23aebc60a9a4c2609da37a9e8accf8/background-balance-beach-289586.jpg"
    //         },
    //         description: "<p>On average, people are spending almost 2 hours every day on social media&nbsp;(5 years and 4 months over a lifetime&nbsp;-&nbsp;socialmediatoday.com).&nbsp;This number has been growing in the past few years, but it might have reached its peak already.</p><p> According to the website Statista,&nbsp;&ldquo;spending more time with family and friends&rdquo; is one of the top 10 new year&rsquo;s resolutions for 2019 (US).&nbsp;The quest for more authentic connections with others&nbsp;is gathering&nbsp;an increasing number of&nbsp;supporters&nbsp;as we&rsquo;re&nbsp;diving&nbsp;into&nbsp;a digital detox era.</p><h3> Opinion Piece&nbsp;</h3><p> People want to be continually connected as much as they want to be less connected.&nbsp;It seems paradoxical, but it&nbsp;probably isn&rsquo;t.</p><p> Silicon Valley is already addressing this&nbsp;particular need:&nbsp;iOS 12&nbsp;offers &ldquo;detailed information and tools to help users understand and control the time they spend with apps and websites, how often they pick up their iPhone or iPad during the day and how they receive notifications&rdquo;&nbsp;(Craig Federighi, Apple&rsquo;s Senior Vice President of Software Engineering);&nbsp;Instagram is also&nbsp;providing analytics to help people understand how much time they&rsquo;re spending on the app.&nbsp;</p><p> There are many more examples of tech solutions&nbsp;currently&nbsp;being developed&nbsp;to address the digital detox era.&nbsp;Companies are turning this threat into an opportunity&nbsp;and new solutions&nbsp;are popping up in all shapes and sizes:&nbsp;voice assistants&nbsp;are booming due to the generalized craving for authentic interactions; meditation apps such as Stop, Breath &amp; Think&nbsp;are helping people staying mindful;&nbsp;Platforms like Forest&nbsp;have real-world impact as they&nbsp;plant&nbsp;trees&nbsp;as rewards for the time users spend off their phones.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //     }, //Adverse circumstances                     // RADAR 	Authenticity / Disconnection
    //     { id: "vocabulary_ich_1268",
    //         color: "#E58903",
    //         megatrend_relevance: 140,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ce58d1e28d883edd7d/2db87446f8c8a7d0952a2a0fcdf80813/american-casual-cellphone-1262971.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ce58d1e28d883edd7d/2db87446f8c8a7d0952a2a0fcdf80813/american-casual-cellphone-1262971.jpg"
    //         },
    //         description: "<p> It&rsquo;s&nbsp;a common online joke that Maslow&rsquo;s&nbsp;Pyramid of Needs should have &ldquo;Wi-Fi&rdquo;&nbsp;on its base.</p><p> Nowadays,&nbsp;the ability to share something is perceived as having the same importance&nbsp;as&nbsp;the most basic human needs.&nbsp;People want to track their number of&nbsp;steps,&nbsp;but they also want to compare it with their friends and family.</p><p> Data mining and machine learning tools pushed&nbsp;consumer&rsquo;s expectations to stratospheric levels:&nbsp;people are&nbsp;placing all their trust into algorithms that suggest the content they should&nbsp;consume&nbsp;or the products or services they should purchase.&nbsp;To feed those algorithms, all&nbsp;they&nbsp;need to&nbsp;do is&nbsp;to continually&nbsp;generate&nbsp;(and track)&nbsp;huge amounts of data.</p><p> There are free lunches, if you&rsquo;re willing to&nbsp;share&nbsp;a picture of&nbsp;what you ate.&nbsp;</p><h3> Opinion piece</h3><p> Paying your lunch with&nbsp;a&nbsp;Revolut&nbsp;card&nbsp;and immediately getting a notification on your smartwatch&nbsp;is the kind of&nbsp;brilliant&nbsp;interactions&nbsp;that we currently take for granted.</p><p> In fact, <em> Integration </em> may end up being the&nbsp;most important verb&nbsp;in the near future.&nbsp;Take the Apple Watch Series 4&nbsp;as an example: you can wear a gadget on your wrist&nbsp;that is able to make phone calls, read emails, track your&nbsp;all-day activity, perform ECGs and, eventually, call an ambulance.&nbsp;</p><p> This&nbsp;example shows&nbsp;that people are willing to share their data if&nbsp;there&rsquo;s a clear benefit for them in the deal.&nbsp;Thus, geo-location&nbsp;exclusive promotions, gamification campaigns and&nbsp;offers powered by data mining may&nbsp;have a big impact on consumer&rsquo;s choices from now on.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //     }, //Demographic issues                     // RADAR	Continuous Connection
    //     { id: "vocabulary_ich_1287",
    //         color: "#E01A25",
    //         megatrend_relevance: 588,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59d8c468d449f3215466/aeb0dfa3ac871f6d33b71eae8894c429/adult-african-afro-1059115.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59d8c468d449f3215466/aeb0dfa3ac871f6d33b71eae8894c429/adult-african-afro-1059115.jpg"
    //         },
    //         description: "<p>The Marketing Mix is becoming ever more dynamic and the weights that consumers allocate to Price, Packaging, Place, and Product are continually changing. Customers rationale is shifting from transactional to relational as new variables are being brought to the equation.&nbsp;</p><p>More than good or cheap products, consumers are looking for memorable and sharable experiences.&nbsp;</p><p>A good example of how brands are adapting to people&rsquo;s&nbsp;cravenness&nbsp;for the new and exciting is that luxury fashion stores are hiring museum curators to set up instore displays.&nbsp;</p><h3>Opinion piece</h3><p>Remember the Starbucks&rsquo; Unicorn Frappuccino that Anthony&nbsp;Bordain&nbsp;reviewed as &ldquo;the perfect nexus of awfulness&rdquo;?&nbsp;Well, according to UBS research,&nbsp;there were around 180.000 Instagram photos of the drink being posted in just one week.&nbsp;</p><p>According to a survey conducted by&nbsp;Schofields, &ldquo;more than 40% of those under 33 prioritize&nbsp; <em> Instagrammability </em> &nbsp;when choosing their next holiday spot&rdquo;.&nbsp;&nbsp;</p><p>Colorful,&nbsp;insta-worthy&nbsp;products, packages and&nbsp;set ups&nbsp;have an increasing influence in the decision-making process,&nbsp;especially&nbsp;on millennial consumers.&nbsp;Retailers who are willing to provide&nbsp;those kinds of experiences&nbsp;will&nbsp;eventually&nbsp;gain the upper hand over their competitors.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //     }, //Derived practice                     // RADAR	Experiences
    //     { id: "vocabulary_ich_1264",
    //         color: "#C20049",
    //         megatrend_relevance: 615,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c56ba3edf251f4322696e/52fc7162caa0cd5f8df42c9f5c316cfc/apricot-background-berry-1028599.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c56ba3edf251f4322696e/52fc7162caa0cd5f8df42c9f5c316cfc/apricot-background-berry-1028599.jpg"
    //         },
    //         description: "<p> This may not look like a trend, because healthy lifestyles have been a&nbsp;big part of the&nbsp;social&nbsp;paradigm in the past few years.&nbsp;But the truth is that emergent technologies and new business models are&nbsp;leveraging disruptive behaviors and new opportunities for companies to explore.</p><p> A big example of these new opportunities is the&nbsp;appearance of&nbsp;standardized treatments, tailored from personal data collected from continuous connected platforms and devices.&nbsp;The successful advancements in&nbsp;anti-aging research are also a huge breakthrough, as life expectancy&nbsp;is predicted to exceed 90 years in coming decades.</p><p> With the mental health taboo&nbsp;finally&nbsp;being&nbsp;addressed by companies and the&nbsp;public opinion,&nbsp;solutions to tackle depression or to boost mindfulness will&nbsp;continue to increase in value&nbsp;perceived by the consumers.&nbsp;</p><h3> Opinion piece</h3><p> The progress in preventive healthcare,&nbsp;the expansion of life expectancy&nbsp;and the&nbsp;increasing openness&nbsp;for new debates will probably have a considerable impact&nbsp;on&nbsp;customer profiling, as people will&nbsp;experience&nbsp;extended life quality and&nbsp;will no longer be hesitant in looking for solutions to tackle mental illnesses.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //         }, //Environmental degradation                     // RADAR	Health and Wellness
    //     { id: "vocabulary_ich_1286",
    //         color: "#991C71",
    //         megatrend_relevance: 400,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c5a03391e4d3ae3dbb21f/ff117a46e9ac96da51f82fae7dc9d18b/art-close-up-ecology-886521.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c5a03391e4d3ae3dbb21f/ff117a46e9ac96da51f82fae7dc9d18b/art-close-up-ecology-886521.jpg"
    //         },
    //         description: "<p> <strong> It is very common to exclusively link Sustainability to environmental issues. But in fact, the concept is much broader as it addresses different (yet interconnected) domains: environment, economic and social. <br /> <br /> </strong></p><p> According to the&nbsp;Bruntland&nbsp;Report for the World Commission on Environment and Development (1992), Sustainability is defined as 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs'.&nbsp;</p><p> The number of people putting on their ethical lenses is increasing every day, as many studies show that most consumers are willing to pay more for responsibly-produced goods and services.</p><p> From an ecological point of view, it's of paramount importance for all businesses to convert processes across the entire supply chain in order to conserve resources and reduce emissions.&nbsp;</p><p> As for sustainable work, the Gig Economy boosted the debate about responsible work practices (e.g. <a href='https://twitter.com/search?q=%23slaveroo&amp;src=typd'> #slaveroo </a> ). <br /> <br /></p><h3> Opinion piece&nbsp;</h3><p> Sonae&nbsp;has been&nbsp;tackling&nbsp;the&nbsp;Social&nbsp;Sustainability topic for a long time&nbsp;with&nbsp;initiatives&nbsp;addressing the&nbsp;general society such as&nbsp;Miss&atilde;o&nbsp;Continente,&nbsp;Para um&nbsp;Futuro&nbsp;com&nbsp;Mais&nbsp;Beb&eacute;s&nbsp;and&nbsp;Colega&nbsp;Mudei-te&nbsp;a&nbsp;Casa.&nbsp;Also,&nbsp;in&nbsp;environmental sustainability,&nbsp;SONAE developed&nbsp;economic consequential&nbsp;projects&nbsp;such as&nbsp;Transformar.te&nbsp;or Waste2Energy.&nbsp;</p><p> In the next years, Sustainability will continue to be a big part of the public debate while new solutions to address it will continue to pop up.&nbsp;More than a&nbsp;moral duty&nbsp;for all companies and individuals, addressing&nbsp;it&nbsp;is&nbsp;a&nbsp;responsible and&nbsp;business-efficient decision.</p><p> Go to <a href='https://geekprank.com/' target='_blank'> Geek Prank </a> and try the online Windows XP simulator, play with the classic Minesweeper and Tetris games or listen to some music.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //         }, //Weakened practice and transmission                     // RADAR	Sustainability
    //     { id: "vocabulary_ich_1263",
    //         color: "#66489F",
    //         megatrend_relevance: 298,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ec24fa7a8b15f90972/42d28d4a9599686d7748e386b25d143e/analysis-business-businesswoman-955447.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ec24fa7a8b15f90972/42d28d4a9599686d7748e386b25d143e/analysis-business-businesswoman-955447.jpg"
    //         },
    //         description: "<p> According to Euromonitor International,&nbsp;by 2013, three-fourths of the global population will have access to the Internet.&nbsp;Digitalization keeps democratizing&nbsp;the access to content and information,&nbsp;which is triggering&nbsp;new and unpredictable&nbsp;socioeconomic impacts.&nbsp;</p><p> Convenience, simplicity and knowledge are a few of the perks&nbsp;that the information era brought to the consumers.&nbsp;Thus, additionally to&nbsp;expecting zero-effort experiences, people know exactly what they want, how they want it, and where they can find it.&nbsp;&nbsp;</p><p> The helicopter view over the whole market is&nbsp;becoming more and more accessible to all customers.&nbsp;At any moment, with the tip of their fingers, people can compare prices, quality, customer service, and&nbsp;understand which supply chain&nbsp;is&nbsp;a better match for their needs and beliefs.&nbsp;&nbsp;</p><h3> Opinion piece</h3><p> As irrationality&nbsp;keeps losing&nbsp;space in the decision-making process,&nbsp;companies&nbsp;should prepare and be ready to address&nbsp;demanding&nbsp;customers that are more aware then ever of the market&rsquo;s big picture.&nbsp;That presents a&nbsp;continuous challenge/opportunity&nbsp;trade-off&nbsp;for retailers:&nbsp;people can now compare competitors by the&nbsp;smallest&nbsp;details, but the&nbsp;companies can&nbsp;also&nbsp;identify,&nbsp;and address people&rsquo;s needs&nbsp;a lot more efficiently.&nbsp;&nbsp;</p><p> Social Media presence and SEO are powerful tools to&nbsp;take advantage of this social trend.&nbsp;A best practice example of how to address the advent of&nbsp;the informed society is&nbsp;Worten&rsquo;s&nbsp;&ldquo;Pre&ccedil;o&nbsp;M&iacute;nimo&nbsp;Garantido&rdquo; campaign.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //     }, //Globalized information                     // RADAR	Informed Consumers
    //     { id: "vocabulary_ich_1284",
    //         color: "#2074A0",
    //         megatrend_relevance: 242,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59f574b782708d04a9c3/b49801c02c2d5ef4b966baa0dc48f3f5/20-fenchurch-street-architecture-buildings-34092.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59f574b782708d04a9c3/b49801c02c2d5ef4b966baa0dc48f3f5/20-fenchurch-street-architecture-buildings-34092.jpg"
    //         },
    //         description: "<p> With the advent of the&nbsp;information society, people started keeping big entities accountable&nbsp;for their social and environmental footprints.&nbsp;&nbsp;</p><p> Career opportunities are being democratized, as&nbsp;the debate on religious, racial and gender inclusion keeps getting louder&nbsp;by the day.&nbsp;&nbsp;</p><h3> Opinion piece</h3><p> People expect companies to tackle recruiting biases, the gender pay gap and all the other inclusion-inefficient processes. Those who fail to address people&rsquo;s concerns may also lose their preference.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //     }, //New products and techniques                     // RADAR	Corporate Responsibility
    //     { id: "vocabulary_ich_1269",
    //         color: "#10A66E",
    //         megatrend_relevance: 159,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59fdfa11208579e077ff/461a7a2dbea925a57c61f57eb5aa04e7/android-wallpaper-artistic-asphalt-799443_(1).jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59fdfa11208579e077ff/461a7a2dbea925a57c61f57eb5aa04e7/android-wallpaper-artistic-asphalt-799443_(1).jpg"
    //         },
    //         description: "<p> &nbsp;&ldquo;The only thing that moves faster than the speed of technology is the speed of our expectations&rdquo;&nbsp;&ndash;&nbsp;this&nbsp;is&nbsp;how Martin&nbsp;Harbech, Group Director at Facebook,&nbsp;summarized&nbsp;the&nbsp;search for friction-free experiences and the&nbsp;current&nbsp;rise of&nbsp;our&nbsp;impatience levels.&nbsp;&ldquo;We used to be completely comfortable with booking a cab within a period of 24 hours. Now, we&rsquo;ll go completely nuts if we&nbsp;have to&nbsp;wait more than 5 minutes for&nbsp;an&nbsp;Uber ride&rdquo;, he added.&nbsp;</p><p> Nowadays,&nbsp;not only the customer is always right,&nbsp;but his/her&nbsp;thumb is also always almighty.&nbsp;Omnichannel solutions are shaping the&nbsp;way business is done, as people&rsquo;s expectations keep&nbsp;evolving every day.</p><h3> Opinion piece</h3><p> With customer journeys becoming&nbsp;more&nbsp;dynamic&nbsp;by the second, retailers&nbsp;should&nbsp;focus on&nbsp;providing&nbsp;every possible solution to address&nbsp;the&nbsp;always changing&nbsp;needs&nbsp;of its clients.&nbsp;This effervescency will only get stronger as emergent technologies and new information will keep on&nbsp;lifting people&rsquo;s expectations.&nbsp;</p><p> Nowadays, customers want everything, right now, at their door.&nbsp;And they want to try it before they buy it.&nbsp;And, if possible, they will pay it with their phones.&nbsp;Successful examples such as Amazon Go,&nbsp;Revolut&nbsp;or Apple&nbsp;Pay show that&nbsp;people want&nbsp;Retail&nbsp;to become a friction-free industry.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //         }, //Missing objects, spaces or systems                     // RADAR	Seamlessness / Ease
    //     { id: "vocabulary_ich_1267",
    //         color: "#7EB852",
    //         megatrend_relevance: 174,
    //         icon: {
    //             "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59e3f14359604cb1e208/af4c42f0ec57bd09704cf53374246911/black-and-white-computer-device-163017.jpg",
    //             "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59e3f14359604cb1e208/af4c42f0ec57bd09704cf53374246911/black-and-white-computer-device-163017.jpg"
    //         },
    //         description: "<p>Digitalization is the couples&rsquo; therapy that retailers and its customers always needed. Companies can now listen like they never could. They can pay more attention to people&rsquo;s needs and continually increase their value proposition by addressing every customer as a unique individual.</p><p> A good example of this new marital life is Netflix and the way it&rsquo;s customizing content creation according to its users&rsquo; preferences. (Spoiler Alert) In the first 30 seconds of House of Cards, the main character kills a dog. Through Big Data analytics, Netflix learned that a lot of users switched to another show after that scene. So, the company learned that some people don&rsquo;t like to watch dogs being killed and it probably won&rsquo;t suggest them a similar show anymore.</p><p> Social media is being used as a platform for people to promote themselves as their own personal brand, which is boosting the demand for unique and personalized products.</p><h3> Opinion Piece</h3><p> Globalization is opening new lifestyles opportunities for everyone. Thus, as customers keep exploring new habits and hobbies, companies need to be able to keep up with this granular streaming of expectations.</p><p> Data mining campaigns powered by effective loyalty programs can help families with different diet restrictions, undecided online buyers, and many more.</p>",
    //         list: "megatrend",
    //         year: "",
    //         multinational: true,
    //         link: "#"
    //     }, //Socioeconomical problems                     // RADAR	Hyper Personalization
    // ]

    //New Megatrend generator:
    const threat_metadata = [
        {
            "id": "vocabulary_ich_1265",
            "color": "#332288",
            "megatrend_relevance": "99",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59b44bf940147abd176f/bd23aebc60a9a4c2609da37a9e8accf8/background-balance-beach-289586.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59b44bf940147abd176f/bd23aebc60a9a4c2609da37a9e8accf8/background-balance-beach-289586.jpg"
            },
            "description": "On average, people are spending almost 2 hours every day on social media (5 years and 4 months over a lifetime - socialmediatoday.com). This number has been growing in the past few years, but it might have reached its peak already. \nAccording to the website Statista, “spending more time with family and friends” is one of the top 10 new year’s resolutions for 2019 (US). The quest for more authentic connections with others is gathering an increasing number of supporters as we’re diving into a digital detox era.\nPeople want to be continually connected as much as they want to be less connected. It seems paradoxical, but it probably isn’t. \nSilicon Valley is already addressing this particular need: iOS 12 offers “detailed information and tools to help users understand and control the time they spend with apps and websites, how often they pick up their iPhone or iPad during the day and how they receive notifications” (Craig Federighi, Apple’s Senior Vice President of Software Engineering).</br></br><h5>Opinion Piece</h5>Companies are turning this threat into an opportunity and new solutions are popping up in all shapes and sizes:meditation apps such as Stop, Breath & Think are helping people staying mindful; Platforms like Forest have real-world impact as they plant trees as rewards for the time users spend off their phones;  voice assistants are booming due to the generalized craving for authentic interactions. \nTo provide a scalable and viable human customer interaction, the companies must equip the staff that contacts with customers with tools to improve their efficiency and effectiveness.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1268",
            "color": "#88ccee",
            "megatrend_relevance": "140",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ce58d1e28d883edd7d/2db87446f8c8a7d0952a2a0fcdf80813/american-casual-cellphone-1262971.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ce58d1e28d883edd7d/2db87446f8c8a7d0952a2a0fcdf80813/american-casual-cellphone-1262971.jpg"
            },
            "description": "It’s a common online joke that Maslow’s Pyramid of Needs should have “Wi-Fi” on its base. \nNowadays, the ability to share something is perceived as having the same importance as the most basic human needs. People want to track their number of steps, but they also want to compare it with their friends and family. \nData mining and machine learning tools pushed consumer’s expectations to stratospheric levels: people are placing all their trust into algorithms that suggest the content they should consume or the products or services they should purchase. To feed those algorithms, all they need to do is to continually generate (and track) huge amounts of data. \nThere are free lunches, if you’re willing to share a picture of what you ate.</br></br><h5>Opinion Piece</h5>Paying your lunch with a Revolut card and immediately getting a notification on your smartwatch is the kind of brilliant interactions that we currently take for granted. \nIn fact, Integration may end up being the most important verb in the near future. Take the Apple Watch Series 4 as an example: you can wear a gadget on your wrist that is able to make phone calls, read emails, track your all-day activity, perform ECGs and, eventually, call an ambulance.\nThis example shows that people are willing to share their data if there’s a clear benefit for them in the deal. Thus, geo-location exclusive promotions, gamification campaigns and offers powered by data mining may have a big impact on consumer’s choices from now on.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1284",
            "color": "#44aa99",
            "megatrend_relevance": "242",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59f574b782708d04a9c3/b49801c02c2d5ef4b966baa0dc48f3f5/20-fenchurch-street-architecture-buildings-34092.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59f574b782708d04a9c3/b49801c02c2d5ef4b966baa0dc48f3f5/20-fenchurch-street-architecture-buildings-34092.jpg"
            },
            "description": "With the advent of the information society, people started keeping big entities accountable for their social and environmental footprints. \nCareer opportunities are being democratized, as the debate on religious, racial and gender inclusion keeps getting louder by the day.</br></br><h5>Opinion Piece</h5>People expect companies to tackle recruiting biases, the gender pay gap and all the other inclusion-inefficient processes. Those who fail to address people’s concerns may also lose their preference.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1287",
            "color": "#117733",
            "megatrend_relevance": "588",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59d8c468d449f3215466/aeb0dfa3ac871f6d33b71eae8894c429/adult-african-afro-1059115.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59d8c468d449f3215466/aeb0dfa3ac871f6d33b71eae8894c429/adult-african-afro-1059115.jpg"
            },
            "description": "There is a fundamental shift in consumer values towards experiences over things that bring happiness and well-being, with spending on experiences like travel, leisure and food service to rise to US$8.0 trillion by 2030, according with Euromonitor.\nWe can observe a touristic boom in most cities around the world. Few destinations have witnessed a boom in tourism over the last few years quite like Portugal. People are showing and apparent consumption schizophrenia subjecting themselves to low cost products such as tight seats in low-cost airlines but not looking at expenses to buy a good experience such as a dinner in a starred restaurant.\nThe preference of experience over things also affect employment, now HR offices are compelled to use all sorts of inexpensive and easy-to-try technologies (e.g. constant feedback, benefits-on-demand, recognition, social integrations) that will help develop an employee experience based on big data and two-way feedback.\n[1] https://blog.euromonitor.com/experiences-overtaking-consumers-buying/</br></br><h5>Opinion Piece</h5>Those at the front line such as retailers and restaurateurs are tackling this trend head on by placing more emphasis on the consumer experience as a vehicle for boosting sales and margins. Creating more intimate experiences with consumers, providing a seamless shopping environment whether online or in-store and storytelling massively.\nThe experience trend is impacting across sectors, from the importance of the shopping experience in the retail sector, and the value placed on the dine-in experience in consumer food service. The food is required to deliver an experience per se.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1264",
            "color": "#999933",
            "megatrend_relevance": "615",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c56ba3edf251f4322696e/52fc7162caa0cd5f8df42c9f5c316cfc/apricot-background-berry-1028599.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c56ba3edf251f4322696e/52fc7162caa0cd5f8df42c9f5c316cfc/apricot-background-berry-1028599.jpg"
            },
            "description": "This may not look like a trend, because healthy lifestyles have been a big part of the social paradigm in the past few years. But the truth is that emergent technologies and new business models are leveraging disruptive behaviors and new opportunities for companies to explore. \nA big example of these new opportunities is the appearance of standardized treatments, tailored from personal data collected from continuous connected platforms and devices. The successful advancements in anti-aging research are also a huge breakthrough, as life expectancy is predicted to exceed 90 years in coming decades. \nWith the mental health taboo finally being addressed by companies and the public opinion, solutions to tackle depression or to boost mindfulness will continue to increase in value perceived by the consumers.</br></br><h5>Opinion Piece</h5>The progress in preventive healthcare, the expansion of life expectancy and the increasing openness for new debates will probably have a considerable impact on customer profiling, as people will experience extended life quality and will no longer be hesitant in looking for solutions to tackle mental illnesses.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1267",
            "color": "#ddcc77",
            "megatrend_relevance": "174",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59e3f14359604cb1e208/af4c42f0ec57bd09704cf53374246911/black-and-white-computer-device-163017.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59e3f14359604cb1e208/af4c42f0ec57bd09704cf53374246911/black-and-white-computer-device-163017.jpg"
            },
            "description": "Digitalization is the couples’ therapy that retailers and its customers always needed. Companies can now listen like they never could. They can pay more attention to people’s needs and continually increase their value proposition by addressing every customer as a unique individual. \nA good example of this new marital life is Netflix and the way it’s customizing content creation according to its users’ preferences. (Spoiler Alert) In the first 30 seconds of House of Cards, the main character kills a dog. Through Big Data analytics, Netflix learned that a lot of users switched to another show after that scene. So, the company learned that some people don’t like to watch dogs being killed and it probably won’t suggest them a similar show anymore.\nSocial media is being used as a platform for people to promote themselves as their own personal brand, which is boosting the demand for unique and personalized products.</br></br><h5>Opinion Piece</h5>Globalization is opening new lifestyles opportunities for everyone. Thus, as customers keep exploring new habits and hobbies, companies need to be able to keep up with this granular streaming of expectations. \nData mining campaigns powered by effective loyalty programs can help families with different diet restrictions, undecided online buyers, and many more.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1263",
            "color": "#cc6677",
            "megatrend_relevance": "298",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ec24fa7a8b15f90972/42d28d4a9599686d7748e386b25d143e/analysis-business-businesswoman-955447.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59ec24fa7a8b15f90972/42d28d4a9599686d7748e386b25d143e/analysis-business-businesswoman-955447.jpg"
            },
            "description": "According to Euromonitor International, by 2013, three-fourths of the global population will have access to the Internet. Digitalization keeps democratizing the access to content and information, which is triggering new and unpredictable socioeconomic impacts.\nConvenience, simplicity and knowledge are a few of the perks that the information era brought to the consumers. Thus, additionally to expecting zero-effort experiences, people know exactly what they want, how they want it, and where they can find it. \nThe helicopter view over the whole market is becoming more and more accessible to all customers. At any moment, with the tip of their fingers, people can compare prices, quality, customer service, and understand which supply chain is a better match for their needs and beliefs. </br></br><h5>Opinion Piece</h5>As irrationality keeps losing space in the decision-making process, companies should prepare and be ready to address demanding customers that are more aware then ever of the market’s big picture. That presents a continuous challenge/opportunity trade-off for retailers: people can now compare competitors by the smallest details, but the companies can also identify, and address people’s needs a lot more efficiently. \nSocial Media presence and Search Engine Optimization (SEO) are powerful tools to take advantage of this social trend. A best practice example of how to address the advent of the informed society is Worten’s campaign “Preço Mínimo Garantido”.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1269",
            "color": "#882255",
            "megatrend_relevance": "159",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59fdfa11208579e077ff/461a7a2dbea925a57c61f57eb5aa04e7/android-wallpaper-artistic-asphalt-799443_(1).jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c59fdfa11208579e077ff/461a7a2dbea925a57c61f57eb5aa04e7/android-wallpaper-artistic-asphalt-799443_(1).jpg"
            },
            "description": " “The only thing that moves faster than the speed of technology is the speed of our expectations” – this is how Martin Harbech, Group Director at Facebook, summarized the search for friction-free experiences and the current rise of our impatience levels. “We used to be completely comfortable with booking a cab within a period of 24 hours. Now, we’ll go completely nuts if we have to wait more than 5 minutes for an Uber ride”, he added.\nNowadays, not only the customer is always right, but his/her thumb is also always almighty. Omnichannel solutions are shaping the way business is done, as people’s expectations keep evolving every day. </br></br><h5>Opinion Piece</h5>With customer journeys becoming more dynamic by the second, retailers should focus on providing every possible solution to address the always changing needs of its clients. This effervescency will only get stronger as emergent technologies and new information will keep on lifting people’s expectations.\nNowadays, customers want everything, right now, at their door. And they want to try it before they buy it. And, if possible, they will pay it with their phones. Successful examples such as Amazon Go, Revolut or Apple Pay show that people want Retail to become a friction-free industry. ",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        },
        {
            "id": "vocabulary_ich_1286",
            "color": "#aa4499",
            "megatrend_relevance": "400",
            "icon": {
                "small": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c5a03391e4d3ae3dbb21f/ff117a46e9ac96da51f82fae7dc9d18b/art-close-up-ecology-886521.jpg",
                "large": "https://trello-attachments.s3.amazonaws.com/5c3c5633d9bfc4792a65502c/5c3c5a03391e4d3ae3dbb21f/ff117a46e9ac96da51f82fae7dc9d18b/art-close-up-ecology-886521.jpg"
            },
            "description": "It is very common to exclusively link Sustainability to environmental issues. But in fact, the concept is much broader as it addresses different (yet interconnected) domains: environment, economic and social.\nAccording to the Bruntland Report for the World Commission on Environment and Development (1992), Sustainability is defined as \"development that meets the needs of the present without compromising the ability of future generations to meet their own needs\".\nThe number of people putting on their ethical lenses is increasing every day, as many studies show that most consumers are willing to pay more for responsibly-produced goods and services. \nFrom an ecological point of view, it's of paramount importance for all businesses to convert processes across the entire supply chain in order to conserve resources and reduce emissions.\nAs for sustainable work, the Gig Economy boosted the debate about responsible work practices (e.g. #slaveroo).</br></br><h5>Opinion Piece</h5>Sonae has been tackling the Social Sustainability topic for a long time with initiatives addressing the general society such as Missão Continente, Para um Futuro com Mais Bebés and Colega Mudei-te a Casa. Also, in environmental sustainability, SONAE developed economic consequential projects such as Transformar.te or Waste2Energy.\nIn the next years, Sustainability will continue to be a big part of the public debate while new solutions to address it will continue to pop up. More than a moral duty for all companies and individuals, addressing it is a responsible and business-efficient decision.",
            "list": "megatrend",
            "year": "",
            "multinational": true,
            "link": "#"
        }
    ];

    window.categorythreatjson = threat_metadata;
    const threat_ids = threat_metadata.map(d => d.id)
    const color_threat_scale = d3.scaleOrdinal()
        .domain(threat_ids)
        .range(threat_metadata.map(d => d.color))

    //Scale for the radius of the concepts, based on their degree
    const scale_concept_radius = d3.scaleSqrt()
        .domain([0, 30])
        .range([0, 70])
    //Scale for the radius of the threats, based on their degree
    const scale_threat_radius = d3.scaleSqrt()
        .domain([0, 30])
        .range([0, 80])

    //ICH elements
    let node_radius = 20
    const radius_elements = 600
    const radius_elements_offset = 1.1 * node_radius
    const radius_elements_title = 680
    const arc_nodes = d3.arc()
    const pie_nodes = d3.pie()
        .sort(null)
        .value(1)
    const element_edge_skew_factor = 0.7 // 1 = right on the element (source)

    //Threat categories
    const radius_threats = 580
    // const threat_circle_radius = 6
    const threat_line_height = 30

    //Threat concepts
    const concept_radius = 6
    const radius_concept = 600
    const radius_concept_title = 450
    // const radius_dot_concept = radius_concept
    let concept_arcs
    const arc_concept = d3.arc()
    const pie_concept = d3.pie()
        .value(d => d.values.length)
        .sort(null)
    let threats_nest

    //Visual styles
    const opacity_concept_default = 0.5
    const opacity_element_default = 0.1
    let arc_gradient_nodes
    let arc_gradient_hover

    //Mouse hovers
    const voronoi = d3.voronoi()
        .x(d => d.x)
        .y(d => d.y)
    let diagram
    let mouse_hover_active = false
    let current_hover = null
    let hover_type = null
    let timer_draw = null

    //Mouse clicks
    let current_click = null
    let click_active = false
    let hover_concept, hover_category

    //Other
    let font_family = "Oswald"
    let scale_factor = 1
    let scale_multiplier = 0.9
    let threat_definitions
    let ICH_num, ICH_num_all
    let showModal = function(element) { console.log(element) }

    let searchflag = false;
    let filterflag = false;
    var active_filter = "";

    //////////////////////// Element edges ///////////////////////
    //Line drawing function for the element edges
    const line = d3.line()
        .x(d => d[0])
        .y(d => d[1])
        // .curve(d3.curveBundle.beta(1))
        .curve(d3.curveBasis)

    //All are based on the distance between the category and ICH element
    //The radius of the first anchor point
    const cr1_offset_scale = d3.scaleLinear()
        .domain([0, 2 * radius_threats])
        .range([-20, -150])
        .clamp(true)
    //The radius of the second anchor point
    const cr2_offset_scale = d3.scaleLinear()
        .domain([0, radius_threats])
        .range([0, 175])
        .clamp(true)
    //The angle of the second anchor point
    const angle2_offset_scale = d3.scaleLinear()
        .domain([0, radius_threats])
        .range([1, 0.5])
        .clamp(true)

    function chart(selection, nodes_raw, edges_raw, lang = "en", callback) {
        
        language = lang
        nodes = nodes_raw
        edges = edges_raw

        threat_definitions = translations[language].definitions

        //////////////////////////////////////////////////////////////
        //////////////// Create the canvas containers ////////////////
        //////////////////////////////////////////////////////////////

        //Canvas for the edges
        canvas_edges = selection.append("canvas").attr("id", "canvas-edges")
        ctx_edges = canvas_edges.node().getContext("2d")

        //Canvas for the nodes
        canvas_nodes = selection.append("canvas").attr("id", "canvas-nodes")
        ctx_nodes = canvas_nodes.node().getContext("2d")

        //Canvas for the hover effects - mostly for performance
        canvas_hover = selection.append("canvas").attr("id", "canvas-hover")
        ctx_hover = canvas_hover.node().getContext("2d")

        //////////////////////////////////////////////////////////////
        ////////////////// Create the SVG container //////////////////
        //////////////////////////////////////////////////////////////

        //SVG container for the things on top such as text
        svg = selection.append("svg")
            .on("mousemove", findElement)
            .on("click", d => {
                click_active = false
                mouseOverReset()
            })

        //Group for all visual elements
        g = svg.append("g").attr("id","visual-elements-group")

        g_scale = g.append("g").attr("id", "scaling-group")

        //////////////////////////////////////////////////////////////
        ////////////////////// Data preparation //////////////////////
        //////////////////////////////////////////////////////////////

        //General, data only, preparation to create the correct arrays
        dataPreparation()
        //Calculate node locations
        nodePlacement()
        //Calculate edge locations
        edgePlacement()

        chart.resize()

        //////////////////////////////////////////////////////////////
        ////////////////////// Set-up the voronoi ////////////////////
        //////////////////////////////////////////////////////////////

        //Calculate a voronoi layout - for mouse events
        diagram = voronoi(elements)

        // //Show the voronoi sites
        // g_scale.append("g")
        //     .attr("class", "element-group")
        //     .selectAll(".element-cell")
        //     .data(diagram.polygons())
        //     .enter().append("path")
        //     .attr("class", ".element-cell")
        //     .style("fill", "none")
        //     .style("stroke", "black")
        //     .style("pointer-events", "none")
        //     .attr("d", d => d ? "M" + d.join("L") + "Z" : null)

        //////////////////////////////////////////////////////////////
        //////////////////////////// Draw ////////////////////////////
        //////////////////////////////////////////////////////////////

        //Create a gradient for the lower arc with ICH labels
        function createGradient(ctx) {
            let num = threat_metadata.length-1
            let grd = ctx.createLinearGradient(-radius_elements_title,0,radius_elements_title,0)
            for(let i = 0; i <= num; i++) grd.addColorStop(i/num, threat_metadata[i].color)
            return grd
        }//function createGradient
        arc_gradient_nodes = createGradient(ctx_nodes)
        arc_gradient_hover = createGradient(ctx_hover)

        //Set-up the final parts of the arc functions
        prepareArcs()

        //Calculate the edge curves
        calculateEdgeCenters(edges_concepts)

        //Setup the hidden SVG mouseover elements
        drawHiddenElements()
        setHiddenHovers()

        //Draw all the pieces on the canvases
        drawCanvas()

        //Initialize Search
        execSearch();

        //Return filtered nodes
        if(callback) callback(elements)

    }//function chart

    //////////////////////////////////////////////////////////////
    ///////////////////// Resize the chart ///////////////////////
    //////////////////////////////////////////////////////////////

    chart.resize = () => {
        total_width = width + margin.left + margin.right
        total_height = height + margin.top + margin.bottom

        //Change sizes of the svg
        svg.attr("width", total_width).attr("height", total_height)
        g.attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")")

        svg.attr("preserveAspectRatio", "xMinYMin meet")
           .attr("viewBox", "0 0 " + total_width + " " + total_height)
           //class to make it responsive
           .classed("svg-content-responsive", true); 

        //Get the scale factor to resize
        let size = Math.min(total_height, total_width)
        scale_factor = roundTo(size / base_size * scale_multiplier, 2)
        //Scale everything to fit
        g_scale.attr("transform", "scale(" + scale_factor + ")")

        //Update voronoi for mouseover
        voronoi.extent([[(-margin.left - width/2)/scale_factor, (-margin.top - height/2)/scale_factor], [total_width, total_height]])

        //If the canvas scale factor hasn't been set yet, figure out the best for this screen
        if(!sf_set) {
            sf = Math.min(2, getPixelRatio(ctx_nodes) ) //no more than 2
            sf_original = sf
        }//if

        //Change sizes of the canvas based on the scale factor
        crispyCanvas(canvas_edges, ctx_edges)
        crispyCanvas(canvas_nodes, ctx_nodes)
        crispyCanvas(canvas_hover, ctx_hover)

        //Redraw
        drawCanvas()

        return 1 //Needed for the saveImage function
    }//function resize

    //////////////////////////////////////////////////////////////
    ///////////////// General data preparation ///////////////////
    //////////////////////////////////////////////////////////////

    /////////////////// Initial data filtering ///////////////////
    function dataPreparation() {

        ///////////////////// COUNTRY MAPPING ////////////////////

        //Create a node -> node id mapping
        node_by_id = {}
        nodes.forEach(d => { node_by_id[d.id] = d })

        //What connections remain per node
        linked_to_id = {}
        edges.forEach(d => {
            //Save all of the connections to a specific node
            if (!linked_to_id[d.source]) linked_to_id[d.source] = []
            if (!linked_to_id[d.target]) linked_to_id[d.target] = []
            linked_to_id[d.source].push(node_by_id[d.target])
            linked_to_id[d.target].push(node_by_id[d.source])
        })//forEach

        //Attach a list of countries to the ICH elements //RADAR
        // nodes
        //     .filter(d => d.type === "element")
        //     .forEach(d => {
        //         d.countries = linked_to_id[d.id].filter(l => l.type === "country").map(l => l.label)
        //     })

        //////////////////// INITIAL FILTERING ///////////////////

        nodes = nodes.filter(d => {
            //Filter out any elements that are not on the urgent list
            if (d.type === "element") return d.meta.list === "USL" || d.meta.list === "microtrends-list" || d.meta.list === "RL-Radar" ? true : false //RADAR
            //Filter out any node that is a concept that isn't of group: threat
            else if (d.type === "concept") return (d.group === "threat" ? true : false)
            else return false
        })//filter
        //Create a node -> node id mapping: 52 ICH elements, 9 categories & 54 threats
        node_by_id = {}
        nodes.forEach(d => { node_by_id[d.id] = d })
        //Filter out any edges that were associated to the nodes filtered above
        edges = edges.filter(d => { return node_by_id[d.source] && node_by_id[d.target] })

        //Second filtering based on connections
        nodes = nodes.filter(d => {
            d.degree = edges.filter(l => l.source == d.id || l.target == d.id).length
            // console.log(d.threat_categories)
            // console.log(d.id + " : " + d.degree)
            // if(d.threat_categories) return d.degree = d.degree+1// This forces the radar to keep elements with threat_category = [] set in the graph_edited_en JSON
            // console.log(d.id + " : " + d.degree)
            //Filter out any element that has 0 degrees
            if(d.type === "element") return (d.degree >= 1) ? true : false
            //Keep all threat categories
            else if(threat_ids.indexOf(d.id) >= 0) return true
            else {
                //Only keep threats that have a connection to a remaining ICH element
                let connections = edges.filter(l => (l.source === d.id && node_by_id[l.target].type === "element") || (l.target === d.id && node_by_id[l.source].type === "element"))
                return connections.length >= 1 ? true : false
            }//else
        })//forEach

        //Create a node -> node id mapping
        node_by_id = {}
        nodes.forEach(d => { node_by_id[d.id] = d })

        //What connections remain per node
        linked_to_id = {}
        edges.forEach(d => {
            //Save all of the connections to a specific node
            if (!linked_to_id[d.source]) linked_to_id[d.source] = []
            if (!linked_to_id[d.target]) linked_to_id[d.target] = []
            linked_to_id[d.source].push(node_by_id[d.target])
            linked_to_id[d.target].push(node_by_id[d.source])
        })//forEach

        //////////////////// THREAT CATEGORIES /////////////////// (MIDDLE EQUATOR LINE)

        //Connect the translations to the threat_metadata
        let data_translations = translations[language].categories
        threat_metadata.forEach(d => d.label = data_translations[data_translations.map(b => b.id).indexOf(d.id)].label)

        //Find the threat categories - ones that are not connected to a ICH element
        threats = nodes.filter(d => {
            //Is this id in the predefined list
            return threat_ids.indexOf(d.id) >= 0
        })//filter
        threats.forEach(d => {
            d.meta = threat_metadata[threat_ids.indexOf(d.id)]
            d.title = d.meta.label
            d.group = "threat category"
            d.degree = d.meta.megatrend_relevance*0.1 // RADAR
            threat_by_id[d.id] = d
        })//forEach
        //Sort them by the id defined above
        threats = threats.sort((a, b) => threat_ids.indexOf(a.id) - threat_ids.indexOf(b.id))

        // console.log(threats.map(d => d.label))
        // //Between 3 - 9 & 15 for weakened practice

        ///////////////////////// THREATS //////////////////////// (TOP HEMISPHERE)

        let threat_def_ids = threat_definitions.map(d => d.id)

        //The remaining concepts are threats
        concepts = nodes.filter(d => d.type === "element" || threat_ids.indexOf(d.id) >= 0 ? false : true)
        concepts.forEach(d => {
            //Get this node's threat category
            let threats_connected = linked_to_id[d.id].filter(n => n.group === "threat category")
            if(threats_connected.length !== 1) console.log("not 1 threat category", d.id, d.label, threats_connected)
            d.threat_category = threats_connected[0].id

            d.opacity = 1
            d.fill = color_threat_scale(d.threat_category)
            concept_by_id[d.id] = d

            let def = threat_def_ids.indexOf(d.id)
            d.definition = def >= 0 ? threat_definitions[def].definition : "" //definition to be added
        })//forEach

        //Sort by the threat category and then alphabetically
        concepts = concepts.sort((a,b) => {
            if(threat_ids.indexOf(a.threat_category) < threat_ids.indexOf(b.threat_category)) return -1
            if(threat_ids.indexOf(a.threat_category) > threat_ids.indexOf(b.threat_category)) return 1
            if(a.label < b.label) return -1
            if(a.label > b.label) return 1
            return 0
        })//sort

        concepts_other = concepts.filter(d => d.threat_category !== "vocabulary_ich_1286")
        //Those threats connected to "Weakened practice and transmission (categ)"
        concepts_weak = concepts.filter(d => d.threat_category === "vocabulary_ich_1286")

        /////////////////////// ICH ELEMENTS ///////////////////// (BOTTOM HEMISPHERE)

        elements = nodes.filter(d => d.type === "element")

        elements.forEach(d => {
            //Get the threats an element is mapped to (all of weight 2)
            let threats_connected = linked_to_id[d.id].filter(n => n.group === "threat")
            d.threats = threats_connected.map(n => n.id)
            d.threats = d.threats.sort((a, b) => {
                let a_threat = threat_ids.indexOf(concept_by_id[a].threat_category)
                let b_threat = threat_ids.indexOf(concept_by_id[b].threat_category)
                if(a_threat < b_threat) return -1
                if(a_threat > b_threat) return 1
                return 0
            })//sort
            // d.threat_categories = [...new Set(d.threats.map(l => concept_by_id[l].threat_category))] //HERE IS WHERE EACH ELEMENT IS GIVEN A CATEGORY... how to make it append to existing array??
            
            tempthreatcat = Array.from(new Set(d.threats.map(l => concept_by_id[l].threat_category))) //HERE IS WHERE EACH ELEMENT IS GIVEN A CATEGORY... how to make it append to existing array??
            // console.log(d.threat_categories);
            if (d.threat_categories) {d.threat_categories = Array.from(new Set(tempthreatcat.concat(d.threat_categories)));} else {d.threat_categories = tempthreatcat;}
            // console.log(concept_by_id);
        })//forEach
        ICH_num_all = elements.length

        //Sort alphabetically
        elements = elements.sort((a,b) => {
            if(a.label < b.label) return -1
            if(a.label > b.label) return 1
            return 0
        })
        window.globalelements = elements; // RADAR

    }//function dataPreparation

        const scaleXfactor = 1.5
        const scaleYfactor = 1
    ////////////////// Calculate node placement //////////////////
    function nodePlacement() {
        let num, start_angle, end_angle
        let offset = 0.025 * pi2

        ////////////////////// ICH ELEMENTS ////////////////////// (BOTTOM HEMISPHERE)

        num = elements.length
        start_angle = pi1_2 + offset
        end_angle = pi2 - (pi1_2 + offset)
        elements.forEach((d,i) => {
            d.angle = i/(num-1) * (end_angle - start_angle) + start_angle
            let sign = i%2 === 0 ? -1 : 1
            let rad = radius_elements + sign * radius_elements_offset
            d.x = rad * Math.cos(d.angle - pi1_2) * scaleXfactor
            d.y = rad * Math.sin(d.angle - pi1_2) * scaleYfactor
        })//forEach

        //////////////////// THREAT CATEGORIES /////////////////// (MIDDLE EQUATOR LINE)

        num = threats.length
        let total_width = 2 * radius_threats * scaleXfactor// CHANGE WIDTH HORIZONTAL SCALE scaleXfactor
        let space = total_width / num
        threats.forEach((d,i) => {
            d.x = (i + 0.5) * space - radius_threats * scaleXfactor
            d.y = 0
            d.space = space

            d.fill = color_threat_scale(d.id)
            d.opacity = 1

            //Get the total number of lines
            ctx_nodes.font = "normal normal 400 24px " + font_family
            d.num_lines = wrapText(ctx_nodes, d.title, 0, 0, space, threat_line_height, false, true)

            //Get the locations of the circles
            let circle_offset = 10
            let offset = d.num_lines * threat_line_height
            d.circle_offset = offset / 2 + circle_offset
        })//forEach

        ////////////////////// CONCEPT ARCS ////////////////////// (TOP HEMISPHERE PLACEMENT ANGLES ETC)

        //Roll up the countries into an array of areas and the number of countries per area
        threats_nest = d3.nest()
            .key(d => d.threat_category)
            .entries(concepts)

        // offset = 0
        start_angle = -pi1_2 + offset
        end_angle = pi1_2 - offset
        let padding = 0.02 //default=0.04
        pie_concept
            .startAngle(start_angle)
            .endAngle(end_angle)
            .padAngle(padding)

        ctx_nodes.font = 'normal normal 300 19px ' + font_family //Needed to get the text width
        concept_arcs = pie_concept(threats_nest)
        concept_arcs.forEach(d => {
            d.totalAngle = d.endAngle - d.startAngle
            d.centerAngle = d.startAngle + d.totalAngle/2
            d.opacity = 1

            let num = d.data.values.length
            let angle_step = (d.totalAngle - 2*padding) / num
            let angle = d.startAngle + 1.5*padding

            //Loop over each concept within this threat category
            d.data.values.forEach(n => {
                n.angle = angle
                // n.test = "lol"
                n.angle_width = angle_step
                n.x = radius_concept * Math.cos(angle - pi1_2) * scaleXfactor
                n.y = radius_concept * Math.sin(angle - pi1_2) * scaleYfactor
                n.r = concept_radius
                n.width = ctx_nodes.measureText(n.label).width
                angle = angle + angle_step
            })//forEach
        })//forEach
    }//function nodePlacement

    ////////////////// Calculate edge placement //////////////////
    function edgePlacement() {
        ////////////////////// Concept edges /////////////////////

        //Get all the edges that should run between the threat categories and the threats
        let concept_ids = concepts.map(l => l.id)
        edges_concepts = edges.filter(d => {
            if (threat_ids.indexOf(d.source) >= 0 && concept_ids.indexOf(d.target) >= 0) return true
            else if (threat_ids.indexOf(d.target) >= 0 && concept_ids.indexOf(d.source) >= 0) return true
            else return false
        })//filter
        // console.log(concept_ids)
        // console.log(threat_ids)
        // console.log(edges_concepts)

        edges_concepts.forEach(d => {
            edge_concept_by_id[d.source + "," + d.target] = true
            d.source = concept_by_id[d.source] //Threat
            d.target = threat_by_id[d.target] //Threat category
            d.sign_pos = -1
            d.opacity = opacity_concept_default
        })//forEach

        ////////////////////// Element edges /////////////////////

        elements.forEach(d => {
            d.threat_categories.forEach(l => {
                edges_elements.push({
                    source: d.id,
                    target: l
                })//push
            })//forEach
        })//forEach

        edges_elements.forEach(d => {
            edge_concept_by_id[d.source + "," + d.target] = true
            d.source = node_by_id[d.source] //ICH element
            d.target = threat_by_id[d.target] //Threat category
            d.sign_pos = 1
            d.opacity = opacity_element_default

            // d.target.degree += 1 // RADAR
        })//forEach

        //Calculate the line points for the edges
        line.context(ctx_edges)
        edges_elements.forEach(d => {
            // console.log(d) // diagnostic for finding where it's hanging
            let target_y = d.target.y + d.sign_pos * d.target.circle_offset

            let dx = d.target.x - d.source.x
            let dy = d.target.y - d.source.y

            let r_source = Math.sqrt(sq(d.source.x) + sq(d.source.y))*element_edge_skew_factor; //Math.sqrt(sq(d.source.x) + sq(d.source.y)) //prev: radius_elements
            let r_source_offset = Math.sqrt(sq(dx) + sq(dy))
            let angle_offset = Math.atan2(dy, dx) - pi1_2 + pi2

            let cr1 = r_source + cr1_offset_scale(r_source_offset)
            let cx1 = cr1 * Math.cos(d.source.angle - pi1_2)
            let cy1 = cr1 * Math.sin(d.source.angle - pi1_2)

            let angle2 = pi + (angle_offset - pi)*0.5 * angle2_offset_scale(r_source_offset)
            let cr2 = cr2_offset_scale(r_source_offset)
            let cx2 = d.target.x + cr2 * Math.cos(angle2 - pi1_2)
            let cy2 = target_y + cr2 * Math.sin(angle2 - pi1_2)

            d.line_data = [[d.source.x, d.source.y],[cx1,cy1],[cx2,cy2],[d.target.x, target_y]]
        })//forEach

    }//function edgePlacement

    //////////////////////////////////////////////////////////////
    ///////////////////////////// Arcs ///////////////////////////
    //////////////////////////////////////////////////////////////

    ////////////////// Prepare the arc functions /////////////////
    function prepareArcs() {
        ///////////////////// Node pie charts ////////////////////
        //Node pie charts
        arc_nodes
            .outerRadius(node_radius)
            .innerRadius(0)
            .context(ctx_nodes)

        ///////////////////// Concept threats ////////////////////
        arc_concept
            .startAngle(d => d.angle - 0.5 * d.angle_width)
            .endAngle(d => d.angle + 0.5 * d.angle_width)
            .innerRadius(radius_concept - 2*concept_radius)
            .outerRadius(d => radius_concept + 2*concept_radius + d.width + 10)
    }//function prepareArcs

    //////////////////////////////////////////////////////////////
    //////////////////////////// Texts ///////////////////////////
    //////////////////////////////////////////////////////////////

    ////////////// ICH element label outside circle //////////////
    function showElementTitle(ctx, type, text, ICH_num) {
        text = text ? text : ICH_num + " | " + translations[language].titles[0]
        //Create a white arc on the background so cover the potential fixed title
        if(type === "hover") {
            ctx.scale(scaleXfactor,scaleYfactor)
            ctx.fillStyle = "white"
            ctx.beginPath()
            ctx.arc(0, 0, radius_elements + 2*radius_elements_offset + 10, pi * 0.05, pi * 0.95)
            ctx.arc(0, 0, radius_elements_title + 40, pi * 0.95, pi * 0.05, true)
            ctx.closePath()
            ctx.fill()
            ctx.scale(1/scaleXfactor,1/scaleYfactor)
        }//if

        //Draw a background arc
        ctx.scale(scaleXfactor,scaleYfactor)
        ctx.fillStyle = (type === "nodes" ? arc_gradient_nodes : arc_gradient_hover)
        ctx.beginPath()
        ctx.arc(0, 0, radius_elements_title, pi * 0.15, pi * 0.85)
        ctx.arc(0, 20, radius_elements_title - 8, pi * 0.87, pi * 0.17, true)
        ctx.fill() //18 -8 0.82 0.22
        ctx.scale(1/scaleXfactor,1/scaleYfactor)

        //Draw the text
        ctx.scale(scaleXfactor,scaleYfactor)
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.font = "normal normal 400 36px " + font_family
        ctx.fillStyle = "black"
        drawTextAlongArc(ctx, text, pi, radius_elements_title, "down", 0.6, false)
        ctx.scale(1/scaleXfactor,1/scaleYfactor)

        // let font_size = fitText(ctx, text, 34, 2*radius_elements_title)
        // ctx.font = "normal normal 400 " + font_size + "px " + font_family
        // ctx.strokeText(text, 0, 50)
        // ctx.fillText(text, 0, 50)

        // ctx.font = "normal normal 400 34px " + font_family
        // wrapText(ctx, text, 0, 250, 2*300, 48, false)
    }//function showElementTitle

    /////////////////// Concept label in circle //////////////////
    function showConceptTitle(ctx, d) {
        ctx.textBaseline = 'bottom'
        ctx.textAlign = 'center'
        ctx.fillStyle = d.fill
        ctx.strokeStyle = "white"
        ctx.lineWidth = 8

        //Add the threat's name
        // let font_size = fitText(ctx, d.label, 44, 2*radius_concept_title)
        let offset = -350
        ctx.font = "normal normal 400 " + 43 + "px " + font_family
        ctx.strokeText(d.label, 0, offset)
        ctx.fillText(d.label, 0, offset)

        //Add small rectangle below
        let width_text = ctx.measureText(d.label).width * 0.4
        ctx.strokeRect(0 - width_text/2, offset, width_text, 5)
        ctx.fillRect(0 - width_text/2, offset, width_text, 5)

        ctx.font = "normal normal 400 20px IBM Plex Serif"
        ctx.textBaseline = 'middle'
        let line_height = 30
        let max_width = 2 * radius_threats * 0.6
        // let lines = wrapText(ctx, d.definition, 0, -270, max_width, line_height, false, true) + 0.5
        // //Create background white rect that's a little see through
        // ctx.fillStyle = "rgba(255,255,255,0.6)"
        // ctx.fillRect(-max_width/2, -290, max_width, lines * line_height)
        //Add threat definition below
        ctx.fillStyle = "black"
        wrapText(ctx, d.definition, 0, -270, max_width, line_height, true)
    }//function showConceptTitle

    ///////////////// Smallest fitting font size /////////////////
    function fitText(ctx, text, font_size, width) {
        //Lower the font size until the text fits the canvas
        do {
            font_size -= 1
            ctx.font = "normal normal 400 " + font_size + "px " + font_family
        } while (ctx.measureText(text).width > width)
        return font_size
    }//function fitText

    ////////////////// Fit & wrap text on canvas /////////////////
    //From: https://codepen.io/bramus/pen/eZYqoO
    function wrapText(ctx, text, x , y, max_width, line_height = threat_line_height, do_stroke = false, get_num_lines = false) {
        let words = text.split(' ')
        let line = ''
        let num_lines = 0

        for (let n = 0; n < words.length; n++) {
            let new_line = line + words[n] + ' '
            let new_width = ctx.measureText(new_line).width
            if (new_width > max_width && n > 0) {
                if(!get_num_lines) {
                    if(do_stroke) ctx.strokeText(line.trim(), x, y)
                    ctx.fillText(line.trim(), x, y)
                }//if
                num_lines += 1
                line = words[n] + ' '
                y += line_height
            }
            else line = new_line
        }//for n
        if(!get_num_lines) {
            if(do_stroke) ctx.strokeText(line.trim(), x, y)
            ctx.fillText(line.trim(), x, y)
        }//if
        num_lines += 1

        if(get_num_lines) return num_lines
    }//function wrapText

    ////////////////////// Draw curved text //////////////////////
    function drawTextAlongArc(ctx, str, angle, radius, side, kerning = 0.6){
        let startAngle = (side === "up" ? angle : angle - pi)
        if(side === "up") str = str.split("").reverse().join("") // Reverse letters

        //Rotate 50% of total angle for center alignment
		for (let j = 0; j < str.length; j++) {
			let charWid = ctx.measureText(str[j]).width
			startAngle += ((charWid + (j === str.length-1 ? 0 : kerning)) / radius) / 2
        }//for j

        //Draw thick white stroke as background
        ctx.strokeStyle = "white"
        ctx.lineWidth = 22
        ctx.lineCap = "butt"
        ctx.beginPath()
        ctx.arc(0, 0, radius_elements_title + 4, pi1_2 - startAngle - 0.01, pi1_2 + startAngle + 0.01)
        ctx.stroke()

        //Draw the text
        ctx.beginPath()
        ctx.save()
        ctx.rotate(startAngle)
        for (let n = 0; n < str.length; n++) {
            let charWid = ctx.measureText(str[n]).width/2 // half letter
			//Rotate half letter
            ctx.rotate(-charWid/radius)
            // ctx.strokeText(str[n], 0, (side === "up" ? -1 : 1) * radius)
            ctx.fillText(str[n], 0, (side === "up" ? -1 : 1) * radius)
            //Rotate another half letter
			ctx.rotate(-(charWid + kerning) / radius)
        }//for n
        ctx.restore()
    }//function drawTextAlongArc

    //////////////////////////////////////////////////////////////
    //////////////// Hidden hover element functions //////////////
    //////////////////////////////////////////////////////////////

    /////////////// Draw the hidden mouseover nodes //////////////
    function drawHiddenElements() {
        //Draw the invisible ICH element circles on the SVG
        hover_ich = g_scale.append("g")
            .attr("class", "element-hover-group")
            .selectAll(".element-circle")
            .data(elements)
            .enter().append("circle")
            .attr("class", "element-circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", node_radius)
            .style("fill", "none")
            // .style("opacity", "0.4")
            .style("pointer-events", "all")
            .style("cursor", "pointer")

        //Draw the invisible rectangles of the threat categories
        hover_category = g_scale.append("g")
            .attr("class", "category-hover-group")
            .selectAll(".category-rect")
            .data(threats)
            .enter().append("rect")
            .attr("class", "category-rect")
            .attr("x", d => d.x - d.space/2)
            .attr("y", d => d.y - (d.num_lines + 1) * threat_line_height / 2)
            .attr("width", d => d.space)
            .attr("height", d => (d.num_lines + 1) * threat_line_height)
            .style("fill", "none")
            // .style("opacity", "0.4")
            .style("pointer-events", "all")
            .style("cursor", "pointer")

// console.log(g_scale.selectAll(".threat-hover-path").data(concepts))
        //Draw the invisible arcs over the outside threats
        hover_concept = g_scale.selectAll(".threat-hover-path")
            .data(concepts)
            // .enter().append("path")
        .enter().append("rect")
            .attr("class", "threat-hover-path")
        // .attr("transform", d => (d.angle > 0 ? "rotate("+40+")" : "rotate("+40+")"))
        // .attr('transform', d => 'translate(200,100)rotate(-45)')
        .attr("transform",function (d) {
                return `rotate(${d.angle*(180/pi)-180}, ${d.x},  ${d.y} )`
        }) 
        .attr("width", 20)
        .attr("height", d => d.width+20)
        .attr("x", function (d) {return (d.x-d3.select(this).attr("width")/2)})
        .attr("y", d => d.y-10)
            // .attr("d", arc_concept)
                // .attr("transform", "scale(" + scaleXfactor + "," + scaleYfactor +")")
            .style("fill", "none")
            // .style("opacity", "0.2")
            // .style("stroke", "black")
            .style("pointer-events", "all")
            .style("cursor", "pointer")
    }//function drawHiddenElements

    /////////////// Set the mouseover functionality //////////////
    function setHiddenHovers() {
        hover_ich
            .on("click", d => {
                mouseClick(d,"element")
                window.test = d //RADAR
                console.log(window.test) //RADAR
                // showModal(d)
            })
            .on("dblclick", d => {
                d3.selectAll('#table-container').style('display','none');
                showModal(d)
                clearSelection()
            })

        hover_category
            .on("click", d => {
                mouseClick(d,"category")
                window.test = d //RADAR
                console.log(window.test) //RADAR
                // showModal(d) //RADAR
            })
            .on("dblclick", d => {
                d3.selectAll('#table-container').style('display','block');
                showModal(d)
                clearSelection()
            })
            .on("mouseover", d => {
                if(!click_active) mouseOverCategory(d)
                else {
                    clearCanvas([ctx_hover])
                    ctx_hover.textBaseline = 'middle'
                    ctx_hover.textAlign = 'center'
                    ctx_hover.font = "normal normal 400 24px " + font_family
                    drawCategories(ctx_hover, d, 1)
                }
            })
            .on("mouseout", d => {
                if(!click_active) mouseOverReset()
                else {
                    clearCanvas([ctx_hover])
                    if (click_active && current_click.type == "concept" && current_click.group == "threat") {
                        showConceptTitle(ctx_hover, current_click);
                    }
                }
            })

        hover_concept
            .on("click", d => {
                mouseClick(d,"concept")
                // showModal(d) //RADAR
                // d3.select("#printThis").append("button").on("click",showModal(temp1)).html("Test")
            })
            .on("dblclick", d => {
                d3.selectAll('#table-container').style('display','none');
                showModal(d)
                clearSelection()
            })
            .on("mouseover", d => {
                if(!click_active) {
                    mouseOverConcept(d)
                } else {
                    // mouseOverReset() // Fix to remove current title
            // mouse_hover_active = false
            // hover_type = null
            // current_hover = null
                    clearCanvas([ctx_hover])
                    ctx_hover.textBaseline = 'middle'
                    ctx_hover.font = "normal normal 300 19px " + font_family
                    drawConcepts(ctx_hover, d, 1)
                    showConceptTitle(ctx_hover, d)
                }//else
            })
            .on("mouseout", d => {
                if(!click_active) mouseOverReset()
                else {
                    clearCanvas([ctx_hover])
                    if (click_active && current_click.type == "concept" && current_click.group == "threat") {
                        showConceptTitle(ctx_hover, current_click);
                    }
                }
            })
    }//function setHiddenHovers

    //////////////////////////////////////////////////////////////
    //////////////////// Node drawing functions ////////////////// THIS MODIFIES CIRCLES BOTTOM HEMISPHERE
    //////////////////////////////////////////////////////////////

    /////////////////////// Draw the nodes ///////////////////////
    function drawElements(ctx, d, opacity) {
        opacity = opacity ? opacity : d.opacity

        //Draw the circles as mini pie charts
        let arcs = pie_nodes(d.threat_categories)
        // console.log(d.threat_categories)
        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.rotate(d.angle)
        //Draw each slice
        arcs.forEach(a => {
            ctx.beginPath()
            ctx.moveTo(0, 0) //Needed to make sure Chrome keeps them as circles even at small sizes
            arc_nodes.context(ctx)(a)
            ctx.closePath()
            ctx.fillStyle = chroma(color_threat_scale(a.data)).alpha(opacity).css()
            ctx.fill()
        })//forEach

        //Outside white stroke
        ctx.strokeStyle = chroma("white").alpha(opacity).css()
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(0, 0, node_radius + 1.2, 0, pi2)
        ctx.closePath()
        ctx.stroke()

        ctx.restore()
    }//function drawElements

    ////////////////// Draw the concept circles ////////////////// THIS MODIFIES CONCEPT CIRCLES TOP HEMISPHERE
    function drawConcepts(ctx, d, opacity) {
        //At what angle different from 0 to flip the text direction
        let flip = 0//-0.1 * pi
        opacity = opacity ? opacity : d.opacity

        //Rotate and then move the canvas origin to the concept "dot" location
        ctx.save()
        ctx.translate(d.x,d.y)
        ctx.rotate(d.angle > 0 + flip ? d.angle - pi1_2 : d.angle + pi1_2)
        // ctx.translate((d.angle > 0 + flip ? 1 : -1) * radius_concept, 0) // I (alex) commented this to translate it before the rotate to d.x,d.y
        //Draw the large degree based concept circle
        ctx.globalCompositeOperation = "multiply"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.arc(0, 0, scale_concept_radius(d.degree), 0, pi2)
        ctx.closePath()
        ctx.fillStyle = chroma(d.fill).alpha(Math.max(0.05, opacity/5)).css()
        ctx.fill()
        ctx.globalCompositeOperation = "source-over"

        //Draw the small concept circle
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.arc(0, 0, concept_radius, 0, pi2)
        ctx.closePath()
        ctx.fillStyle = chroma(d.fill).alpha(opacity).css()
        ctx.fill()

        //Draw the text
        ctx.textAlign = d.angle > 0  + flip ? 'start' : 'end'
        let color_text = chroma.mix('black', d.fill, 0.1)
        ctx.fillStyle = chroma(color_text).alpha(opacity).css()
        ctx.translate((d.angle > 0 + flip ? 1 : -1) * (concept_radius + 5), 0)
        ctx.fillText(d.label, 0, -2)
        ctx.restore()
    }//function drawConcepts

    ///////////////// Draw the threat categories /////////////////
    function drawCategories(ctx, d, opacity) {
        opacity = opacity ? opacity : d.opacity

        //Background degree circle
        ctx.globalCompositeOperation = "multiply"
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.arc(d.x, d.y, scale_threat_radius(d.degree), 0, pi2)
        ctx.closePath()
        ctx.fillStyle = chroma(d.fill).alpha(opacity/6).css()
        ctx.fill()
        ctx.globalCompositeOperation = "source-over"

        ctx.fillStyle = chroma(d.fill).alpha(opacity).css()
        // //Small circles around the text
        // ctx.beginPath()
        // //Top circle
        // ctx.moveTo(d.x, d.y - d.circle_offset)
        // ctx.arc(d.x, d.y - d.circle_offset, threat_circle_radius, 0, pi2)
        // //Bottom circle
        // ctx.moveTo(d.x, d.y + d.circle_offset)
        // ctx.arc(d.x, d.y + d.circle_offset, threat_circle_radius, 0, pi2)
        // ctx.closePath()
        // ctx.fill()

        //Rectangles on top and bottom
        let space = d.space * 0.4
        ctx.fillRect(d.x - space/2, d.y - d.circle_offset - 2, space, 4)
        ctx.fillRect(d.x - space/2, d.y + d.circle_offset - 2, space, 4)

        //Draw the text
        // let color_text = chroma.mix('black', d.fill, 0.9)
        ctx.fillStyle = chroma(d.fill).alpha(opacity).css()
        //Draw the text over multiple lines
        wrapText(ctx, d.title, d.x, d.y - (d.num_lines-1) * threat_line_height / 2 - 2.5, d.space)
    }//function drawCategories

    ////////// Add ring around hovered/clicked category //////////
    function showCategoryRing(ctx, d, opacity) {
        ctx.globalCompositeOperation = "multiply"
        ctx.beginPath()
        ctx.arc(d.x, d.y, Math.max(d.space/2, scale_threat_radius(d.degree)) + 14, 0, pi2)
        ctx.closePath()
        ctx.lineWidth = 4
        ctx.strokeStyle = chroma(d.fill).alpha(opacity).css()
        ctx.stroke()
        ctx.globalCompositeOperation = "source-over"
    }//function showCategoryRing

    //////////////////////////////////////////////////////////////
    //////////////////// Edge drawing functions //////////////////
    //////////////////////////////////////////////////////////////

    ///////////////// Draw the ICH element edges /////////////////
    function drawEdgesElements() {
        // ctx_edges.globalCompositeOperation = "multiply" - makes it all tooooo slow
        edges_elements.forEach(d => {
            let stroke = color_threat_scale(d.target.id)
            ctx_edges.strokeStyle = chroma(stroke).alpha(d.opacity).css()
            ctx_edges.beginPath()
            line(d.line_data)
            ctx_edges.stroke()
        })//forEach
        // ctx_edges.globalCompositeOperation = "source-over"
    }//function drawEdgesElements

    /////////////////// Draw the concept edges ///////////////////
    function drawEdgesConcepts() {
        ctx_edges.globalCompositeOperation = "multiply"
        edges_concepts.forEach(d => {
            // console.log(d)
            let stroke = color_threat_scale(d.target.id)
            ctx_edges.strokeStyle = chroma(stroke).alpha(d.opacity).css()
            ctx_edges.beginPath()
            ctx_edges.moveTo(d.source.x, d.source.y)
            let target_y = d.target.y + d.sign_pos * d.target.circle_offset
            if(d.center) drawCircleArc(ctx_edges, d.center, d.r, d.source, d.target, d.sign, target_y)
            else ctx_edges.lineTo(d.target.x, target_y)
            ctx_edges.stroke()
        })//forEach
        ctx_edges.globalCompositeOperation = "source-over"
    }//function drawEdgesConcepts

    ////////////////// Draw a curved edge line ///////////////////
    function drawCircleArc(ctx, c, r, p1, p2, side, target_y) {
        let ang1 = Math.atan2(p1.y - c.y, p1.x - c.x)
        let ang2 = Math.atan2(target_y - c.y, p2.x - c.x)
        ctx.arc(c.x, c.y, r, ang1, ang2, side)
    }//function drawCircleArc

    /////////// Calculate the center for each edge arc ///////////
    function calculateEdgeCenters(edges_data) {

        //Calculates the curve factor of the upper lines outside of the center group
        const scale_curve = d3.scaleLinear() //Slightly magical-numbers like....
            .domain([0, 0.1 * radius_threats, radius_threats])
            .range([50, 2, 1])

        //Calculates the curve factor of the upper lines of the center group
        const scale_curve_center = d3.scalePow() //Slightly magical-numbers like....
            .exponent(0.3)
            .domain([0, 0.45 * radius_threats])
            .range([35, 2])
            .clamp(true)

        edges_data.forEach(d => {
            let curve_factor
            let target_y = d.target.y + d.sign_pos * d.target.circle_offset

            //Find a good radius
            if(d.target.x !== 0) curve_factor = scale_curve(Math.abs(d.target.x))
            else curve_factor = scale_curve_center(Math.abs(d.target.x - d.source.x))
            d.r = Math.sqrt(sq(d.target.x - d.source.x) + sq(target_y - d.source.y)) * curve_factor

            //Find center of the arc function
            let centers = findCenters(d.r, d.source, d.target, target_y)
            if(d.source.y < 0) d.sign = d.target.x > 0 ? 1 : 0 //1 flows from center to right // RADAR
            else d.sign = d.target.x < d.source.x ? 0 : 1
            d.center = d.sign ? centers.c2 : centers.c1
        })//forEach

        //////////// Calculate center for curved edges ///////////
        //https://stackoverflow.com/questions/26030023
        //http://jsbin.com/jutidigepeta/3/edit?html,js,output
        function findCenters(r, p1, p2, target_y) {
            // pm is middle point of (p1, p2)
            let pm = { x: 0.5 * (p1.x + p2.x), y: 0.5 * (p1.y + target_y) }
            // compute leading vector of the perpendicular to p1 p2 == C1C2 line
            let perpABdx = - (target_y - p1.y)
            let perpABdy = p2.x - p1.x
            // normalize vector
            let norm = Math.sqrt(sq(perpABdx) + sq(perpABdy))
            perpABdx /= norm
            perpABdy /= norm
            // compute distance from pm to p1
            let dpmp1 = Math.sqrt(sq(pm.x - p1.x) + sq(pm.y - p1.y))
            // sin of the angle between { circle center,  middle , p1 }
            let sin = dpmp1 / r
            // is such a circle possible ?
            if (sin < -1 || sin > 1) return null // no, return null
            // yes, compute the two centers
            let cos = Math.sqrt(1 - sq(sin))   // build cos out of sin
            let d = r * cos
            let res1 = { x: pm.x + perpABdx * d, y: pm.y + perpABdy * d }
            let res2 = { x: pm.x - perpABdx * d, y: pm.y - perpABdy * d }
            return { c1: res1, c2: res2 }
        }//function findCenters
    }//function calculateEdgeCenters

    //////////////////////////////////////////////////////////////
    /////////////////// Canvas drawing functions /////////////////
    //////////////////////////////////////////////////////////////

    ////////////////////// Clear all canvases ////////////////////
    function clearCanvas(ctxs) {
        ctxs.forEach(d => {
            d.clearRect((-margin.left - width/2)/scale_factor*scaleXfactor, (-margin.top - height/2)/scale_factor*scaleYfactor,
            total_width/scale_factor*scaleXfactor, total_height/scale_factor*scaleYfactor)
        })
    }//function clearCanvas

    /////////////// Draw all parts on the canvases ///////////////
    function drawCanvas() {
        //Clear everything
        clearCanvas([ctx_edges, ctx_nodes, ctx_hover])

        //Draw the edges between the categories and the threats
        ctx_edges.lineWidth = 5
        drawEdgesConcepts()
        //Draw the edges between the categories and the ICH elements
        drawEdgesElements()

        //Draw threat categories
        ctx_nodes.textBaseline = 'middle'
        ctx_nodes.textAlign = 'center'
        ctx_nodes.font = "normal normal 400 24px " + font_family
        threats.forEach(d => { drawCategories(ctx_nodes, d) })

        //Draw the other concepts around the top outside
        ctx_nodes.textBaseline = 'middle'
        ctx_nodes.font = "normal normal 300 19px " + font_family // controls font for concepts (applications)
        concepts.forEach(d => { drawConcepts(ctx_nodes, d) })

        //Draw the ICH elements around the bottom outside
        elements.forEach(d => { drawElements(ctx_nodes, d) })

        //Show the title
        if(mouse_hover_active) {
            if(hover_type === "element") showElementTitle(ctx_nodes, "nodes", current_hover.label)
            else showElementTitle(ctx_nodes, "nodes", null, ICH_num)
            //Show threat concept title when hovered over top threat
            if(hover_type === "concept") showConceptTitle(ctx_hover, current_hover)
            if(hover_type === "category") showCategoryRing(ctx_nodes, current_hover, 1)
        } else if(click_active) {
            if(hover_type === "element") showElementTitle(ctx_nodes, current_click.label, "nodes")
            else if(hover_type === "concept") showConceptTitle(ctx_hover, current_click)
        } else {
            showElementTitle(ctx_nodes, "nodes", null, ICH_num_all)
        }//else

        // LOOPS TO TAG EVERY NODE WITH ITS ID FOR DEVELOPMENT
        //DELETETHIS
        // threats.forEach(d => { 
        //     ctx_nodes.save();
        //     ctx_nodes.translate(d.x, d.y-50)
        //     ctx_nodes.rotate(0 * Math.PI / 180 + d.x*0.004);
        //     ctx_nodes.fillStyle = "black";
        //     // ctx_nodes.fillText(d.id,0,0); // ids for editing RADAR
        //     ctx_nodes.restore();
        //     //console.log(ctx_nodes)
        //      })
        //DELETETHIS
        //DELETETHIS
        // concepts.forEach(d => { 
        //     ctx_nodes.save();
        //     ctx_nodes.font = "normal normal 600 19px sans-serif"
        //     ctx_nodes.translate(d.x * 0.97, d.y * 0.97)
        //     ctx_nodes.rotate(90 * Math.PI / 180 + d.x*0.001);
        //     ctx_nodes.fillStyle = "black";
        //     // ctx_nodes.fillText(d.id.split("_").pop(),0,0); // ids for editing RADAR
        //     // ctx_nodes.fillText(d.id,0,0); // ids for editing RADAR
        //     ctx_nodes.restore();
        //      })
        // DELETETHIS
        //DELETETHIS
        // elements.forEach(d => { 
        //     ctx_nodes.save();
        //     ctx_nodes.font = "normal normal 600 19px sans-serif"
        //     ctx_nodes.translate(d.x * 0.97, d.y * 0.97)
        //     ctx_nodes.rotate(90 * Math.PI / 180 + d.x*0.001);
        //     ctx_nodes.fillStyle = "black";
        //     // ctx_nodes.fillText(d.id.split("_").pop(),0,0); // ids for editing RADAR
        //     // ctx_nodes.fillText(d.id,0,0); // ids for editing RADAR
        //     ctx_nodes.restore();
        //      })
        // DELETETHIS
    }//function drawCanvas

    //////////////////////////////////////////////////////////////
    //////////////////// Mouse click functions ///////////////////
    //////////////////////////////////////////////////////////////

    function mouseClick(d, click_type) {
        if(d3.event) d3.event.stopPropagation()
        click_active = true

        //Call the correct drawing function
        if(click_type === "element") mouseOverElement(d)
        else if(click_type === "concept") mouseOverConcept(d)
        else if(click_type === "category") mouseOverCategory(d)

        current_click = d
    }//function mouseClick

    ////////////////////// Manually fix node /////////////////////
    chart.fixNode = (node_id) => {
        //Check if it's in the data
        let node = node_by_id[node_id]
        if(node) mouseClick(node, "element")
    }//function fixNode

    //////////////////////////////////////////////////////////////
    //////////////////// Mouse over functions ////////////////////
    //////////////////////////////////////////////////////////////

    /////////////////// Mouse over ICH elements //////////////////
    function findElement() {
        let m = d3.mouse(this)
        let x = (m[0] - total_width/2)/scale_factor
        let y = (m[1] - total_height/2)/scale_factor

        let xR = radius_elements*scaleXfactor
        let yR = radius_elements*scaleYfactor
        let gap = 2.2*radius_elements_offset
        // let r = Math.sqrt(x*x + y*y) //deprecated since we lost circular simetry
        // // visualize Ellipse
        // const ellipses = [{"cx":  0, "cy":  0, "rx": xR-gap, "ry": yR-gap},
        //     {"cx":  0, "cy":  0, "rx": xR+gap, "ry": yR+gap}
        // ];
        // const svgEllipses = g_scale.selectAll("ellipse").data(ellipses).enter().append("ellipse");
        // svgEllipses.attr("cx", (d,i) => { return d.cx; })
        //     .attr("cy", (d,i) => { return d.cy; })
        //     .attr("rx", (d,i) => { return d.rx; })
        //     .attr("ry", (d,i) => { return d.ry; });
        // svgEllipses.attr('fill', 'blue').attr('fill-opacity','0.2');
        // // End visualize Ellipse
        //Only continue of the mouse is somewhere near the ICH element arc
        // if(y > 70 && r > radius_elements - 2*radius_elements_offset && r < radius_elements + 2*radius_elements_offset) { //deprecated sqrt since we lost circular simetry
        if(y > 70 && (x**2/(xR-gap)**2+y**2/(yR-gap)**2>1 && x**2/(xR+gap)**2+y**2/(yR+gap)**2<1)) { // ellipse equation instead of circle
            //Search for nearby ICH element
            let found = diagram.find(x, y, (node_radius * 2)/scale_factor)
            //A match is found and it's a new one
            if (found && current_hover !== found.data) {
                if(!click_active) mouseOverElement(found.data)
                //If a click is active and you hover over another element
                else if(click_active) {
                    current_hover = found.data
                    clearCanvas([ctx_hover])
                    drawElements(ctx_hover, found.data, 1)
                    showElementTitle(ctx_hover, "hover", found.data.label)
                }//else if
            }//if
            //When hovering away from an element and no click is active
            else if (!click_active && !found && mouse_hover_active) mouseOverReset()
            //When a click is active and you hover away
            else if(click_active && !found) {
                clearCanvas([ctx_hover])
                current_hover = null
            }//else if
        } //if
        else if(y > 70 && (x**2/(xR-gap)**2+y**2/(yR-gap)**2>1)) {
            clearCanvas([ctx_hover])
            if (click_active && current_click.type == "concept" && current_click.group == "threat") {
                showConceptTitle(ctx_hover, current_click);
            }
        }
        // else if(click_active && y > 70 && r > radius_elements - 2*radius_elements_offset - 40) clearCanvas([ctx_hover]) // deprecated bcuz of elliptical geom
        else if (!click_active && mouse_hover_active && hover_type === "element")  mouseOverReset()
        else if (y > 70 && (x**2/(xR+gap)**2+y**2/(yR+gap)**2<1) && (click_active && current_click.type == "concept" && current_click.group == "threat") ) { // check if we need to redraw concept title on center
            clearCanvas([ctx_hover])
            showConceptTitle(ctx_hover, current_click);
        }
    }//function findElement

    function mouseOverElement(d) {
        //If the canvas fade is still active, stop it
        if(timer_draw) timer_draw.stop()
        mouse_hover_active = true
        hover_type = "element"
        current_hover = d
        let id = d.id

        //Draw the edges from element to threat category
        edges_elements.forEach(l => { l.opacity = (l.source.id === id ? 0.5 : 0) })

        //Draw the edges from the threat category to the threats
        edges_concepts.forEach(l => { l.opacity = (d.threats.indexOf(l.source.id) >= 0 && d.threat_categories.indexOf(l.target.id) >= 0 ? 0.5 : 0) })

        //Draw the ICH circles
        elements.forEach(n => { n.opacity = (n.id === id ? 1 : 0.1) })

        //Draw connected threat categories
        threats.forEach(n => { n.opacity = (d.threat_categories.indexOf(n.id) >= 0 ? 1 : 0.1) })

        //Draw connected threats
        concepts.forEach(n => { n.opacity = (d.threats.indexOf(n.id) >= 0 ? 1 : 0.1) })

        //Draw it all
        drawCanvas()
    }//function mouseOverElement

    ///////////////// Mouse over threat category /////////////////
    function mouseOverCategory(d) {
        if(timer_draw) timer_draw.stop()
        mouse_hover_active = true
        hover_type = "category"
        current_hover = d
        let id = d.id

        //Draw the edges from threat category to the elements
        edges_elements.forEach(l => { l.opacity = (l.target.id === id ? 0.5 : 0) })

        //Draw the edges from the threat category to the threats
        edges_concepts.forEach(l => { l.opacity = (l.target.id === id ? 0.5 : 0) })

        //Draw the ICH circles
        elements.forEach(n => { n.opacity = (n.threat_categories.indexOf(id) >= 0 ? 1 : 0.1) })
        ICH_num = elements.filter(n => n.threat_categories.indexOf(id) >= 0 ).length

        //Draw connected threat categories
        threats.forEach(n => { n.opacity = (n.id === id ? 1 : 0.1) })

        //Draw connected threats
        concepts.forEach(n => { n.opacity = (n.threat_category === id ? 1 : 0.1) })
        megaTechSummaryArr = [];
        concepts.forEach(n => {
            if (n.threat_category === id && n.meta.highlights && n.meta.highlights.technology) {
                for (var i = n.meta.highlights.technology.length - 1; i >= 0; i--) {
                    if (!containsTech(n.meta.highlights.technology[i],megaTechSummaryArr)) {
                        megaTechSummaryArr.push(n.meta.highlights.technology[i])
                    }
                }
            }
        })
        console.log(megaTechSummaryArr)

        function containsTech(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i].uid === obj.uid) {
                    return true;
                }
            }
            return false;
        }
                        function tabulatetech(data, columnnames, rownames) {
                            var table = d3.select("#table-container").append("table").attr('class','table table-striped'),
                                thead = table.append("thead"),
                                tbody = table.append("tbody");

                            // append the header row (column names)
                            col1=[''];newcolnames=col1.concat(columnnames)
                            thead.append("tr")
                                .selectAll("th")
                                .data(newcolnames)
                                .enter()
                                .append("th")
                                .text(function(columnname) { return columnname; })
                                .attr('colid',function(d) {
                                    return d;
                                })
                                .attr('scope','col');
                            // create a row for each row name
                            var rows = tbody.selectAll("tr")
                                .data(rownames)
                                .enter()
                                .append("tr")
                                .attr('rowid',function(d) {
                                    return d;
                                })
                                .attr('scope','row');
                            // fill first column with row names
                            var col1cells = rows.data(rownames)
                                .append('td')
                                .text(function(d) {
                                    return d;
                                })
                                // .attr('rowid',function(d) {
                                //     return d;
                                // })
                                .attr('colid','idxcolumn')
                                .attr('class','idxcolumn')
                                .enter();
                            // fill table body
                            var bodycells = rows.selectAll("td.bodycells")
                                .data(columnnames)
                                .enter()
                                .append('td')
                                .attr('colid',function(d) {
                                    return d;console.log(columnnames)
                                })
                                .each(function(d) {
                                    var currenttechnamearray = [];
                                    var currenttspan
                                    for (var i = megaTechSummaryArr.length - 1; i >= 0; i--) {
                                        // console.log(megaTechSummaryArr[i].impact," =?= ",this.parentNode.attributes.rowid.value)
                                        if (megaTechSummaryArr[i].impact==this.parentNode.attributes.rowid.value &&
                                        megaTechSummaryArr[i].recommendation==this.attributes.colid.value) {
                                            currenttspan = d3.select(this).append('tspan');//.attr('x', 9).attr('dy', '.35em')
                                            currenttspan.text(megaTechSummaryArr[i].name).append('br')
                                        }
                                    }
                                    // return currenttechnamearray
                                })
                                .attr('class','bodycells');

                            return table;
                        }
                        // render the table
                        d3.select("#table-container").html('') //clear old table container

                        tableH5 = d3.select("#table-container").append('h5');
                        tableH5.attr('class', 'mt-4 mb-4').text('Technologies included under this Megatrend');

                        var techTable = tabulatetech(megaTechSummaryArr, ["watch","study","experiment","implement"], ["very_high","high","medium","low"]);
                        // uppercase the column headers and clean _underscores_
                        techTable.selectAll("thead th,td.idxcolumn")
                            .text(function(textcntnt) {
                                var cleanstr = textcntnt.replace("_"," ");
                                return cleanstr.charAt(0).toUpperCase() + cleanstr.substr(1);
                            });
                        // SORT?
                        // techTable.selectAll("tbody tr")
                        //     .sort(function(a, b) {
                        //         console.log(a,b)
                        //         return d3.descending(a["text"], b.age);
                        //     });
      





        //Draw it all
        drawCanvas()
    }//function mouseOverElement

    ///////////////////// Mouse over threats /////////////////////
    function mouseOverConcept(d) {
        //If the canvas fade is still active, stop it
        if(timer_draw) timer_draw.stop()
        mouse_hover_active = true
        hover_type = "concept"
        current_hover = d
        let id = d.id

        //Draw the edges from the threat to the threat category
        edges_concepts.forEach(l => { l.opacity = (l.source.id === id ? 0.5 : 0) })

        //Draw the edges from connected elements to threat category
        edges_elements.forEach(l => { l.opacity = (l.source.threats.indexOf(id) >= 0 && l.target.id === d.threat_category ? 0.5 : 0) })

        //Draw the connected ICH circles
        elements.forEach(n => { n.opacity = (n.threats.indexOf(id) >= 0 ? 1 : 0.1)})
        ICH_num = elements.filter(n => n.threats.indexOf(id) >= 0 ).length

        //Draw connected threat categories
        threats.forEach(n => { n.opacity = (n.id === d.threat_category ? 1 : 0.1) })

        //Draw threats
        concepts.forEach(n => { n.opacity = (n.id === id ? 1 : 0.1) })

        //Draw it all
        drawCanvas()
    }//function mouseOverConcept

    ///////////////////// Search Box function for highlighting nodes /////////////////////
    function execSearch(){ (function searchBoxHighlight() {
        //If the canvas fade is still active, stop it
        if(timer_draw) timer_draw.stop()

        d3.select("#txtName").on("input", focussearchresults = function() {
            clearCanvas([ctx_edges, ctx_nodes, ctx_hover])
            // get search box content
            var txtName = new RegExp(d3.select("#txtName").node().value,"i");
            // dim all nodes that don't match
            elements.forEach(n => {
                n.opacity = (txtName.test([n.label,n.meta.description]) ? 1 : 0.1)
                if (filterflag) {
                    n.opacity = (n.meta.filterlists!==active_filter ? 0.1 : n.opacity)
                }
            })
            threats.forEach(n => {
                n.opacity = (txtName.test([n.label,n.meta.description]) ? 1 : 0.1)
                if (filterflag) {
                    n.opacity = (n.meta.filterlists!==active_filter ? 0.1 : n.opacity)
                }
            })
            concepts.forEach(n => {
                mergedHLtext = []; foundflag = false;
                if (n.meta.highlights) {
                    for (let [hltype, hlobj] of Object.entries(n.meta.highlights)) {
                        hlobj.forEach(e => {
                            mergedHLtext.push(e.name,e.description)
                        })
                    }
                }
                mergedHLtext = mergedHLtext.filter(Boolean);
                foundflag = (txtName.test(n.label) || txtName.test(n.meta.description) || txtName.test(mergedHLtext))
                n.opacity = (foundflag ? 1 : 0.1)
                if (filterflag) {
                    n.opacity = (active_filter.indexOf(n.meta.filterlists) > -1 ? n.opacity : 0.1)
                }
            })
            // hide edges for less confusion
            edges_concepts.forEach(l => { l.opacity = 0 })
            edges_elements.forEach(l => { l.opacity = 0 })
            // dummy object to prevent errors
            current_click = {
                type: "search",
                group: "search",
                label: txtName
            }
            click_active = true
            // elements.forEach(n => { n.opacity = 0})

            // elements.forEach(n => { (n.meta.description.search(txtName) >= 0 ? console.log("found | "+txtName+" | in | "+ n.label) : console.log("didn't find "+txtName))})
            // circles.style("fill", function(d) {
            //   return d.doc === txtName ? "red" : "black";
            // })
            // If search box is !=null, draw cancel button
            if (d3.select("#txtName").node().value && d3.select("#txtName").node().value.length>0) {
                searchflag = true;
                d3.select("#searchCancel").style("opacity",1)
            } else {
                searchflag = false;
                d3.select("#searchCancel").style("opacity",0)
                if (filterflag) {queryURLparams()}
                drawCanvas()
            }
            drawCanvas()
        })
        d3.select("#searchCancel")
            .on("click", cancelSearchFn)
            .on("focus", cancelSearchFn);
        function cancelSearchFn() {
            d3.select("#txtName").node().value="";
            console.log("lol")
            d3.select("#searchCancel").style("opacity",0)
            focussearchresults();
            if (filterflag) {queryURLparams()}
        }
    })()}//function searchBoxHighlight
    ///////////////////// Filter function with URL query parameter parsing /////////////////////
    // filterStrFn();
    queryURLparams = (function filterStrFn() {
        //If the canvas fade is still active, stop it
        if(timer_draw) timer_draw.stop()
        //parse query url params
        var i=0;
        var telem;
        var search_values=location.search.replace('\?','').split('&');
        var query={}
        for(i=0;i<search_values.length;i++){
            telem=search_values[i].split('=');
            query[telem[0]]=telem[1];
        }
        console.log("Query Parameters:",query);
        if (query.filter && query.filter.length>0) {
            active_filter = query.filter;
            filterflag = true;
            clearCanvas([ctx_edges, ctx_nodes, ctx_hover])
            // Dim everything in preparation for focusing the results
            edges_concepts.forEach(l => { l.opacity = 0 })
            edges_elements.forEach(l => { l.opacity = 0 })
            elements.forEach(m => { m.opacity = 0.1 })
            threats.forEach(m => { m.opacity = 0.1 })
            concepts.forEach(m => { m.opacity = 0.1 })
            // Get filter query parameter ?filter=XXXX
            var filterStr = decodeURIComponent(query.filter);
            // console.log(filterStr)
            concepts.forEach(n => {
                if (n.meta.filterlists.indexOf(filterStr) >= 0) {
                    n.opacity = (n.meta.filterlists.indexOf(filterStr) >= 0 ? 1 : 0.1);
                    if(timer_draw) timer_draw.stop()
                    mouse_hover_active = true
                    hover_type = "concept"
                    current_hover = n
                    let id = n.id
                    //Draw the edges from the threat to the threat category
                    edges_concepts.forEach(l => { l.opacity = (l.source.id === id ? 0.1 : l.opacity) })
                    //Draw the edges from connected elements to threat category
                    edges_elements.forEach(l => { l.opacity = (l.source.threats.indexOf(id) >= 0 && l.target.id === n.threat_category ? 0.1 : l.opacity) })
                    //Draw the connected ICH circles
                    elements.forEach(m => {
                        m.opacity = (m.threats.indexOf(id) >= 0 ? 1 : m.opacity) // element opacity
                        m.meta.filterlists = (m.threats.indexOf(id) >= 0 ? [filterStr] : m.meta.filterlists) // include elements in filterlist, if they're connected to app in list (this should be improved)
                    })
                    ICH_num = elements.filter(m => m.threats.indexOf(id) >= 0 ).length
                    //Draw connected threat categories
                    threats.forEach(m => {
                        m.opacity = (m.id === n.threat_category ? 1 : m.opacity)
                        m.meta.filterlists = (m.id === n.threat_category ? [filterStr] : m.meta.filterlists)
                    })
                    //Draw threats
                    // concepts.forEach(n => { n.opacity = (n.id === id ? 1 : n.opacity) })
                    //Draw it all
                }
            })
            d3.select("#filterCancel").style("opacity",1)
            d3.select("#filterCancel").on("click", function() {
                window.location.replace(window.location.href.split('?')[0]);
                filterflag = false;
                // d3.select("#filterCancel").style("opacity",0) //not needed, since we reload the page with no query params
            })
            // dummy object to prevent errors
            current_click = {
                type: "filter",
                group: "filter",
                label: filterStr
            }
            click_active = true
            // elements.forEach(n => { n.opacity = 0})

            // elements.forEach(n => { (n.meta.description.search(txtName) >= 0 ? console.log("found | "+txtName+" | in | "+ n.label) : console.log("didn't find "+txtName))})
            // circles.style("fill", function(d) {
            //   return d.doc === txtName ? "red" : "black";
            // })
            drawCanvas()
        }
    })//function filterStrFn

        ///////////////////// Filter function with URL query parameter parsing /////////////////////
    // popNodeParamFN();
    popNodeParamFN = (function popNode() {
        //If the canvas fade is still active, stop it
        if(timer_draw) timer_draw.stop()
        //parse query url params
        var i=0;
        var telem;
        var search_values=location.search.replace('\?','').split('&');
        var query={}
        for(i=0;i<search_values.length;i++){
            telem=search_values[i].split('=');
            query[telem[0]]=telem[1];
        }
        if (query.popnode && query.popnode.length>0 ) {
            active_node = query.popnode;
            // Get popnode query parameter ?popnode=XXXX
            var popnodeStr = decodeURIComponent(query.popnode);
            node_to_open = graph.nodes[popnodeStr];
            console.log(node_to_open)
            if (typeof node_to_open != 'undefined') {
                show_legend_modal = false;
                showModal(node_to_open);
                click_active = true;
                current_click = "popnode";
                drawCanvas();
            }

        }
    })//function popNode

    //////////////////////////////////////////////////////////////
    ///////////////////// Mouse out functions ////////////////////
    //////////////////////////////////////////////////////////////

    function mouseOverReset() {
        if(timer_draw) timer_draw.stop()
        mouse_hover_active = false
        hover_type = null
        current_hover = null

        //Animate the opacities coming back
        if (searchflag == true) {
            focussearchresults()
            // searchflag = false;
        } else if (filterflag == true) {
            queryURLparams()
        } else {
            fadeCanvasBackIn()
        }
    }//function mouseOverReset

    /////////////////// Fade everything back in //////////////////
    function fadeCanvasBackIn() {
        //Transition settings
        const duration = 250
        const ease = d3.easeQuadInOut

        //Calculate the opacity interpolator
        nodes.forEach(n => { n.interpolate_opacity = d3.interpolate(n.opacity, 1) })
        edges_concepts.forEach(l => { l.interpolate_opacity = d3.interpolate(l.opacity, opacity_concept_default) })
        edges_elements.forEach(l => { l.interpolate_opacity = d3.interpolate(l.opacity, opacity_element_default) })

        //Fade everything back in
        timer_draw = d3.timer(elapsed => {
            //How far along the total duration are we (taking the easing into account)
            let t = ease(Math.min(1,elapsed/duration))

            //Set new opacities
            nodes.forEach(n => { n.opacity = n.interpolate_opacity(t) })
            edges_concepts.forEach(l => { l.opacity = l.interpolate_opacity(t) })
            edges_elements.forEach(l => { l.opacity = l.interpolate_opacity(t) })

            //Draw the canvas
            drawCanvas()

            //Stop when the duration has been reached
            if (elapsed >= duration) timer_draw.stop()
        })//timer
    }//function fadeCanvasBackIn

    //////////////////////////////////////////////////////////////
    ///////////////////// Save result to PNG /////////////////////
    //////////////////////////////////////////////////////////////

    chart.saveImage = (width_print = 20, units = "cm") => {
        ///////////// Calculate new sizes /////////////
        //https://www.pixelcalculator.com/index.php?lang=en&dpi1=300&FS=2
        const dpi_scale = 300 / 2.54 //300 dpi / 2.54cm
        //Calculate the new scale factor
        let sf_new
        if(units === "px") sf_new = width_print / width
        else sf_new = (width_print * dpi_scale) / width
        sf_scale = sf_new / sf
        //Check sizes
        if(sf_new * width * sf_new * height > 268435456) Error("requested canvas is probably too big for the browser to handle")
        sf = sf_new
        sf_set = true

        ///////////// Resize everything /////////////
        //Resize the actual canvas to this
        let resizeDone = new Promise(function(resolve, reject) {
            let result = chart.resize()
            if(result === 1) resolve("resizing done")
            else reject(Error("Resizing broke"))
        })
        //Do the next step after the resizing is done
        resizeDone.then(result => {
            createPrintCanvas()
            //Resize back
            sf = sf_original
            sf_set = sf_set_original
            chart.resize()
        }, error => { console.log(error) })

        function createPrintCanvas() {
            //Create "off-screen" canvas to combine the different layers
            let canvas_save = document.createElement('canvas')
            canvas_save.id = "canvas-print"
            let ctx_save = canvas_save.getContext('2d')
            canvas_save.width = total_width * sf
            canvas_save.height = total_height * sf

            //Draw all the layers onto 1 canvas
            ctx_save.drawImage(canvas_edges.node(), 0, 0, canvas_save.width, canvas_save.height)
            ctx_save.drawImage(canvas_nodes.node(), 0, 0, canvas_save.width, canvas_save.height)
            ctx_save.drawImage(canvas_hover.node(), 0, 0, canvas_save.width, canvas_save.height)

            //Get the image
            // a.href = canvas_save.toDataURL("image/png") //won' work, too large a URL
            try {
                //Automatically download the canvas
                //https://stackoverflow.com/questions/35480112
                //Doesn't work in IE & Edge
                canvas_save.toBlob(blob => {
                    let a = document.createElement("a")
                    let url = URL.createObjectURL(blob)
                    a.href = url
                    a.download = "ICH_Threats.png"
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                },'image/png')
            } catch(err) {
                //Manually download the canvas
                document.body.appendChild(canvas_save)
                document.body.style.overflow = "auto"
                window.scrollTo(0,document.body.scrollHeight)
                console.log("Unable to automatically download the file due to photo and wrong URL")
            }//try-catch
        }//function createPrintCanvas

    }//function saveImage

    //////////////////////////////////////////////////////////////
    /////////////////////// Helper functions /////////////////////
    //////////////////////////////////////////////////////////////

    function sq(x) { return x * x }

    function roundTo(n, digits) {
        let multiplicator = Math.pow(10, digits)
        n = parseFloat((n * multiplicator).toFixed(11))
        return Math.round(n) / multiplicator
    }//function roundTo

    ///////////////// Find the device pixel ratio ////////////////
    function getPixelRatio(ctx) {
        //From https://www.html5rocks.com/en/tutorials/canvas/hidpi/
        let devicePixelRatio = window.devicePixelRatio || 1
        let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1
        let ratio = devicePixelRatio / backingStoreRatio
        return ratio
    }//function getPixelRatio

    ////////////////// Retina non-blurry canvas //////////////////
    function crispyCanvas(canvas, ctx) {
        canvas
            .attr("width", Math.round(sf * total_width))
            .attr("height", Math.round(sf * total_height))
            .style("width", `${total_width}px`)
            .style("height", `${total_height}px`)
        ctx.scale(sf*scale_factor, sf*scale_factor)
        ctx.translate((margin.left + width/2)/scale_factor, (margin.top + height/2)/scale_factor)
    }//function crispyCanvas


    /////////////////////// Clear selection ////////////////////// RADAR

    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }

    //////////////////////////////////////////////////////////////
    //////////////////// Accessor functions //////////////////////
    //////////////////////////////////////////////////////////////

    chart.width = function (value) {
        if (!arguments.length) return width
        width = value
        return chart
    }

    chart.height = function (value) {
        if (!arguments.length) return height
        height = value
        return chart
    }

    chart.nodeRadius = function (value) {
        if (!arguments.length) return node_radius
        node_radius = value
        return chart
    }//function nodeRadius

    chart.scaleFactor = function (value) {
        if (!arguments.length) return sf
        sf = value
        sf_original = sf
        sf_set = true
        sf_set_original = true
        return chart
    }//function scaleFactor

    chart.zoomFactor = function (value) {
        if (!arguments.length) return scale_multiplier
        scale_multiplier = value
        return chart
    }//function zoomFactor

    chart.showModal = function(_) {
        return arguments.length ? (showModal = _, chart) : showModal
    }//function showModal

    return chart

}//function createThreatVisual
