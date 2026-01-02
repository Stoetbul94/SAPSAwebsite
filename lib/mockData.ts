import { News } from "./firebase/firestore";
import { Timestamp } from "firebase/firestore";

export const mockNews: News[] = [
  {
    id: "mock-1",
    title: "2024 National Championships Results Announced",
    content: `
      <p>The 2024 SAPSA National Championships concluded successfully at the Pretoria Shooting Range last weekend, with over 200 competitors participating across multiple divisions.</p>
      <p><strong>Division Winners:</strong></p>
      <ul>
        <li>Production: John Smith (Gauteng)</li>
        <li>Standard: Sarah Johnson (Western Cape)</li>
        <li>Classic: Michael Brown (KwaZulu-Natal)</li>
        <li>Open: David Wilson (Gauteng)</li>
      </ul>
      <p>Full results are now available in the Results section. Congratulations to all participants for an outstanding competition!</p>
    `,
    imageURL: "",
    isPinned: true,
    publishedAt: Timestamp.fromDate(new Date("2024-12-15")),
  },
  {
    id: "mock-2",
    title: "New IPSC Rulebook 2024 Now Available",
    content: `
      <p>The International Practical Shooting Confederation has released the updated 2024 rulebook, which includes several important changes affecting competition procedures and equipment regulations.</p>
      <p><strong>Key Updates:</strong></p>
      <ul>
        <li>Revised holster positioning requirements</li>
        <li>Updated scoring procedures for partial targets</li>
        <li>New equipment inspection guidelines</li>
        <li>Clarifications on stage design principles</li>
      </ul>
      <p>All competitors are encouraged to review the new rulebook, which is available in the Documents section. SAPSA will be conducting rulebook seminars at upcoming club meetings.</p>
    `,
    imageURL: "",
    isPinned: false,
    publishedAt: Timestamp.fromDate(new Date("2024-12-10")),
  },
  {
    id: "mock-3",
    title: "2025 Competition Calendar Released",
    content: `
      <p>SAPSA is pleased to announce the 2025 competition calendar, featuring regional matches, club championships, and the highly anticipated National Championships in September.</p>
      <p><strong>Major Events:</strong></p>
      <ul>
        <li>Gauteng Regional - March 15-16</li>
        <li>Western Cape Championship - May 10-11</li>
        <li>KwaZulu-Natal Open - July 20-21</li>
        <li>National Championships - September 12-14</li>
      </ul>
      <p>Registration for all events will open 60 days prior to each competition. Early registration is recommended as spots fill quickly. Visit the Events page for detailed information and registration links.</p>
    `,
    imageURL: "",
    isPinned: false,
    publishedAt: Timestamp.fromDate(new Date("2024-12-05")),
  },
  {
    id: "mock-4",
    title: "Safety Seminar: Range Officer Certification Course",
    content: `
      <p>SAPSA will be conducting a Range Officer (RO) certification course on January 20-21, 2025, at the Johannesburg Shooting Club. This course is essential for anyone wishing to officiate at IPSC competitions.</p>
      <p><strong>Course Details:</strong></p>
      <ul>
        <li>Duration: 2 days (16 hours)</li>
        <li>Location: Johannesburg Shooting Club</li>
        <li>Cost: R1,200 (includes materials and certification)</li>
        <li>Prerequisites: Minimum 1 year IPSC competition experience</li>
      </ul>
      <p>Certified Range Officers are in high demand for regional and national competitions. Successful completion of this course qualifies participants to officiate at SAPSA-sanctioned events. Registration closes January 10th.</p>
    `,
    imageURL: "",
    isPinned: false,
    publishedAt: Timestamp.fromDate(new Date("2024-11-28")),
  },
  {
    id: "mock-5",
    title: "South African Team Selected for IPSC World Shoot 2025",
    content: `
      <p>SAPSA is proud to announce the selection of the South African team for the IPSC World Shoot 2025, to be held in Thailand. After rigorous qualification matches, the following shooters have been selected:</p>
      <p><strong>Team Members:</strong></p>
      <ul>
        <li>Production: John Smith, Sarah Johnson, Michael Brown</li>
        <li>Standard: David Wilson, Lisa Anderson, Robert Taylor</li>
        <li>Open: James White, Emma Davis, Chris Martinez</li>
      </ul>
      <p>The team will undergo intensive training over the next six months in preparation for the world's premier practical shooting competition. SAPSA extends its congratulations to all selected shooters and wishes them the best of luck in Thailand.</p>
    `,
    imageURL: "",
    isPinned: true,
    publishedAt: Timestamp.fromDate(new Date("2024-11-20")),
  },
  {
    id: "mock-6",
    title: "Club Affiliation Program: Supporting Local Ranges",
    content: `
      <p>SAPSA has launched a new club affiliation program designed to support shooting ranges and clubs across South Africa. This program provides resources, training, and recognition for clubs that meet SAPSA standards.</p>
      <p><strong>Benefits of Affiliation:</strong></p>
      <ul>
        <li>Access to SAPSA-sanctioned competition status</li>
        <li>Training resources for Range Officers and competitors</li>
        <li>Marketing support and event promotion</li>
        <li>Insurance coverage for sanctioned events</li>
        <li>Equipment loan program for new clubs</li>
      </ul>
      <p>Interested clubs should contact SAPSA administration for more information about the affiliation process and requirements. Applications are reviewed quarterly.</p>
    `,
    imageURL: "",
    isPinned: false,
    publishedAt: Timestamp.fromDate(new Date("2024-11-15")),
  },
];
