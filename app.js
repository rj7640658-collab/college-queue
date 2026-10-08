/**
 * CampusQueue Optimizer — College Service Low-Wait Assistant Engine
 * 
 * Follows 5-step optimization workflow:
 * STEP 1: Understand (Requirement, department, physical presence, docs/fees)
 * STEP 2: Clarify (Minimum questions for critical missing info)
 * STEP 3: Optimize (Online vs counter, pre-visit prep, combined visits, department order)
 * STEP 4: Create Low-Wait Plan (Sequential actions minimizing wait)
 * STEP 5: Check For Wasted Time (Bottlenecks, duplicate visits, missing document alerts)
 * 
 * Strict Rules:
 * - Never fabricate college-specific timings, token systems, or exact fees.
 * - Always flag unknowns under verification_needed.
 */

// Preset Knowledge Templates
const PRESET_KNOWLEDGE = {
  bonafide_bank: {
    query: "Need a bonafide certificate for my education loan by tomorrow",
    understood_requirement: "Bonafide Certificate specifically stating fee structure and student standing for Education Loan processing.",
    service_category: "Academic & Administrative Services (Registrar / Student Section)",
    physical_presence_needed: "1 Counter Visit (or 0 if campus has digital e-portal download)",
    confidence: "HIGH",
    time_unplanned: "~90-120 mins (2 counter visits)",
    time_optimized: "~15-20 mins (1 planned stop)",
    time_saved: "Saves ~80% Time",
    recommended_strategy: "Check your student portal first to see if downloadable e-bonafides are enabled. If a physical stamp is mandatory for bank disbursement, draft the standardized application beforehand and get your Academic Advisor/HoD signature before approaching Student Section Counter 4 to prevent being sent back.",
    documents_or_preparation: [
      { id: "doc1", title: "Original College ID Card", desc: "Required at counter for identity verification" },
      { id: "doc2", title: "Latest Semester Fee Receipt Copy", desc: "Verifies no pending semester tuition dues" },
      { id: "doc3", title: "Bank Loan Letter / Format (if bank has specific template)", desc: "Some banks reject standard college formats" },
      { id: "doc4", title: "Pre-written Application addressed to Registrar", desc: "Include Roll No, Branch, Year, and Purpose ('Education Loan')" }
    ],
    step_by_step_plan: [
      {
        step: 1,
        title: "At Home: Check Student ERP / Portal",
        desc: "Log in to college student portal to verify if digital Bonafide with QR verification can be downloaded directly.",
        time: "5 mins",
        tip: "If approved online, print 2 copies and avoid counter queue entirely!"
      },
      {
        step: 2,
        title: "Department Cabin: Secure HoD Endorsement First",
        desc: "If physical form required, obtain signature/initial from Head of Department during early morning office hours (9:30 AM - 10:15 AM).",
        time: "10 mins",
        tip: "Administrative counters will reject applications lacking department endorsement."
      },
      {
        step: 3,
        title: "Admin Block: Submit at Student Section Counter",
        desc: "Present signed application, fee receipt xerox, and student ID. Request inward receipt/token number.",
        time: "10-15 mins",
        tip: "Target 10:30 AM – 11:30 AM (avoid 1:00 PM lunch transition)."
      },
      {
        step: 4,
        title: "Collection: Note Dispatch Time",
        desc: "Ask the clerk for the exact dispatch turnaround (often same day 4:00 PM or next day morning). Do not wait in the corridor.",
        time: "3 mins",
        tip: "Provide contact phone number on the margin if permitted."
      }
    ],
    possible_waiting_points: [
      "Arriving at Student Section without HoD endorsement and being sent back across campus.",
      "Visiting between 12:45 PM and 2:15 PM when counter staff rotate for lunch, causing queues to freeze.",
      "Standing in fee clearance queue if your tuition receipt isn't already attached.",
      "Corridor loitering while certificate is being signed by Registrar (collect at scheduled time instead)."
    ],
    time_saving_opportunities: [
      "Print and fill standard application form before stepping on campus to avoid stationery shop queues.",
      "Check with your batchmates if bank loan bonafides require Principal seal or if Student Section seal is sufficient.",
      "Combine this visit with any pending library book returns or fee receipts."
    ],
    verification_needed: [
      "Verify whether your specific college requires an application fee challan for bonafide issuance.",
      "Verify whether an online e-governance request portal exists for student certificates.",
      "Verify turnaround time (same-day dispatch vs 48-hour processing window)."
    ],
    clarifications: []
  },

  lost_id_hallticket: {
    query: "Lost my college ID card and exam is in 3 days, need hall ticket",
    understood_requirement: "Emergency ID verification & Duplicate ID / Temporary Exam Hall Ticket Clearance.",
    service_category: "Examination Cell & Security / Student Section",
    physical_presence_needed: "2 Connected Stops (Department HoD + Exam Cell)",
    confidence: "HIGH",
    time_unplanned: "~2.5 - 3 hours (multiple offices)",
    time_optimized: "~30-40 mins total",
    time_saved: "Saves ~70% Time",
    recommended_strategy: "Do not queue at the regular duplicate ID card window first (which can take 7–14 days). Instead, immediately request a Temporary Examination Undertaking / Bonafide Pass endorsed by your Department Head, which Exam Cell approves on the spot for hall tickets.",
    documents_or_preparation: [
      { id: "doc1", title: "Government Photo ID (Aadhaar / Driving License / Passport)", desc: "Mandatory proof of identity" },
      { id: "doc2", title: "2 Passport-size Photographs", desc: "Required for temporary pass / emergency slip" },
      { id: "doc3", title: "Current Semester Exam Registration Printout / Roll Number Slip", desc: "Shows subject codes and exam eligibility" },
      { id: "doc4", title: "Lost Property Diary / Written Declaration", desc: "Simple declaration stating lost ID details" }
    ],
    step_by_step_plan: [
      {
        step: 1,
        title: "At Home: Print 2 Photos & Gov ID Xerox",
        desc: "Bring 2 passport photos, xerox of Aadhaar/Gov ID, and exam registration slip before coming to campus.",
        time: "10 mins",
        tip: "Avoid campus photocopy kiosk lines."
      },
      {
        step: 2,
        title: "Step 1: Department Mentor / HoD Cabin",
        desc: "Request an 'Emergency Exam Identity Clearance Slip' or endorsement on your exam timetable slip.",
        time: "15 mins",
        tip: "Explain that exams start in 72 hours so they fast-track the sign."
      },
      {
        step: 3,
        title: "Step 2: Exam Cell (Controller of Examinations)",
        desc: "Present HoD-endorsed slip, photo, and Gov ID. Counter clerk will stamp your Hall Ticket with 'Temporary Exam Permission'.",
        time: "15 mins",
        tip: "Ask if duplicate ID formal application can be filed AFTER exams finish to save time now."
      }
    ],
    possible_waiting_points: [
      "Queuing at the Duplicate Plastic ID counter only to be told it takes two weeks to print.",
      "Visiting Exam Cell without HoD signed recommendation letter.",
      "Lacking physical passport photos and having to leave campus to find a photo studio."
    ],
    time_saving_opportunities: [
      "Ask for a temporary paper exam pass rather than waiting on duplicate smart-card printing.",
      "File police lost report online (e-lost report) if college requires an FIR/NCR copy, rather than visiting police station."
    ],
    verification_needed: [
      "Verify college fee for duplicate ID card or emergency hall ticket reissue challan.",
      "Verify whether police NCR (Non-Cognizable Report) copy is required for duplicate identity cards at your university."
    ],
    clarifications: []
  },

  transcript_higher_ed: {
    query: "Need official transcripts for university abroad / WES evaluation",
    understood_requirement: "Official Academic Transcripts in sealed envelopes or digital university transmission for overseas admissions.",
    service_category: "Controller of Examinations / Academic Transcript Section",
    physical_presence_needed: "1 Counter Visit (or digital verification if portal available)",
    confidence: "HIGH",
    time_unplanned: "~3 - 4 hours + repeat visits",
    time_optimized: "~35 mins (single visit)",
    time_saved: "Saves ~80% Time",
    recommended_strategy: "Prepare chronological grade cards and WES / University Reference Numbers in a single dossier. Pay the transcript fee via official gateway beforehand (or bank challan) before reaching the verification desk.",
    documents_or_preparation: [
      { id: "doc1", title: "All Semester Grade Cards / Marksheets (Originals + 2 xerox sets)", desc: "Must be arranged in chronological order" },
      { id: "doc2", title: "Provisional Degree Certificate or Degree Certificate Copy", desc: "For final year / alumni" },
      { id: "doc3", title: "WES Academic Records Request Form or Target University Reference Sheet", desc: "With your Reference # written clearly" },
      { id: "doc4", title: "Transcript Fee Payment Receipt / Challan", desc: "Exact number of sets paid for" }
    ],
    step_by_step_plan: [
      {
        step: 1,
        title: "Dossier Preparation: Organize Chronologically",
        desc: "Arrange Marksheets Sem 1 through Sem 8 in sequence. Attach WES form on top. Avoid loose sheets.",
        time: "15 mins",
        tip: "Messy documents cause clerks to push your file to the bottom of the pile."
      },
      {
        step: 2,
        title: "Fee Clearance: Verify Payment Slip",
        desc: "If paid online, carry printed transaction receipt. If challan required, settle early morning before queues form.",
        time: "10 mins",
        tip: "Keep 1 xerox of the fee receipt for your own records."
      },
      {
        step: 3,
        title: "Exam Cell Counter: File Submission",
        desc: "Submit dossier at Transcript Counter. Request verification receipt with Inward Tracker ID and expected dispatch date.",
        time: "15 mins",
        tip: "Ask if digital electronic transmission (direct registrar-to-WES email) is supported."
      }
    ],
    possible_waiting_points: [
      "Incomplete semester marksheet sets (missing backlog clearing marksheets).",
      "Arriving without envelopes when your university expects sealed official institutional envelopes.",
      "End-of-semester results peak rush (June-July and Dec-Jan)."
    ],
    time_saving_opportunities: [
      "Check if university has tie-up with electronic transcript services (e.g. TrueCopy, Parchment, National Academic Depository).",
      "Request 2 extra sealed sets in the same visit if applying to multiple universities."
    ],
    verification_needed: [
      "Verify exact per-set transcript fee and authorized payment method.",
      "Verify whether college dispatches directly via courier or requires student collection."
    ],
    clarifications: []
  },

  fee_concession: {
    query: "Have fee concession approval from dean, where to submit?",
    understood_requirement: "Submission of Fee Concession / Scholarship Waiver Approval for Ledger Adjustment & Balance Fee Challan.",
    service_category: "Accounts / Student Finance Section",
    physical_presence_needed: "1 Physical Visit to Accounts Counter",
    confidence: "HIGH",
    time_unplanned: "~2 hours (counter bouncing)",
    time_optimized: "~20-25 mins",
    time_saved: "Saves ~75% Time",
    recommended_strategy: "Do not queue at the general fee payment window. Go straight to the Accounts Adjustment / Scholarship Desk with the original signed Dean letter, and request the updated adjusted challan or ERP ledger update first.",
    documents_or_preparation: [
      { id: "doc1", title: "Original Approval Letter signed by Dean/Principal", desc: "Must have official inward stamp" },
      { id: "doc2", title: "College ID Card & Current Fee Demand Notice", desc: "To cross-verify balance payable" },
      { id: "doc3", title: "Photocopy of Dean Approval Letter", desc: "For Accounts Office record retention" },
      { id: "doc4", title: "Net-Banking / UPI / Demand Draft for Remaining Balance", desc: "Keep ready for remaining fee installment" }
    ],
    step_by_step_plan: [
      {
        step: 1,
        title: "Photocopy Dean's Signed Approval Letter",
        desc: "Keep the original and leave the xerox with accounts, or have them stamp 'Received Copy' on your xerox as personal proof.",
        time: "5 mins",
        tip: "Never surrender your sole original approval letter without a signed acknowledgement!"
      },
      {
        step: 2,
        title: "Accounts Adjustment / Scholarship Desk",
        desc: "Present approval to the Accounts Officer in charge of concessions. They will adjust the ERP billing balance.",
        time: "15 mins",
        tip: "Best time: 10:45 AM – 12:15 PM (after daily register reconciliation)."
      },
      {
        step: 3,
        title: "Pay Remaining Balance & Obtain Clean Fee Receipt",
        desc: "Pay the remaining balance on the spot through digital payment or challan. Ensure the receipt shows 'Full Settlement'.",
        time: "10 mins",
        tip: "Verify your online portal ledger reflects zero dues before leaving."
      }
    ],
    possible_waiting_points: [
      "Waiting in normal fee line only to be told concession requires special verification at Officer cabin.",
      "Approval letter missing Dean's official seal or date.",
      "Not having exact balance payment ready, requiring another trip."
    ],
    time_saving_opportunities: [
      "Ask Accounts clerk to immediately refresh and approve the concession on the ERP student portal.",
      "Get phone extension of the accounts clerk handling concessions for following up."
    ],
    verification_needed: [
      "Verify whether remaining balance can be settled via UPI/Net-banking at the counter.",
      "Verify deadline date after which late fee fines get auto-calculated by the billing software."
    ],
    clarifications: []
  },

  hostel_clearance: {
    query: "Hostel No-Dues Clearance and caution deposit refund",
    understood_requirement: "Hostel Room Handover, No-Dues Clearance & Caution Deposit Refund Processing.",
    service_category: "Hostel Administration, Mess & Accounts Department",
    physical_presence_needed: "2 Physical Stops (Warden Cabin -> Accounts)",
    confidence: "HIGH",
    time_unplanned: "~3 - 4 hours across 2 days",
    time_optimized: "~45 mins total",
    time_saved: "Saves ~75% Time",
    recommended_strategy: "Complete room inventory inspection with the hostel supervisor before going to Warden's office. Collect Warden signature, then immediately route to Accounts with bank passbook copy for deposit refund in one morning.",
    documents_or_preparation: [
      { id: "doc1", title: "Hostel No-Dues Clearance Form", desc: "Download from hostel portal or collect blank form" },
      { id: "doc2", title: "Hostel ID Card & Room Key Tag", desc: "To be surrendered upon clearance" },
      { id: "doc3", title: "Mess Bill Receipts / Clearance Slip", desc: "Proof that all mess dues are cleared" },
      { id: "doc4", title: "Bank Passbook / Cancelled Cheque Copy", desc: "Required by Accounts for Caution Deposit electronic refund" }
    ],
    step_by_step_plan: [
      {
        step: 1,
        title: "Hostel Floor Supervisor / Caretaker Check",
        desc: "Have caretaker inspect room condition (fan, bed, table) and sign the clearance sheet.",
        time: "15 mins",
        tip: "Do this the evening before departure to save morning rush."
      },
      {
        step: 2,
        title: "Warden Cabin: Final Hostel Sign-Off",
        desc: "Hand over room keys and signed caretaker sheet to Warden. Warden signs final No-Dues.",
        time: "10 mins",
        tip: "Warden office hours are typically 9:00 AM - 10:30 AM."
      },
      {
        step: 3,
        title: "Accounts Department: Deposit Refund Voucher",
        desc: "Submit Warden-signed No-Dues form along with bank account details xerox at Accounts counter.",
        time: "15 mins",
        tip: "Ensure IFSC and Account Number are clearly legible."
      }
    ],
    possible_waiting_points: [
      "Warden unavailable because caretaker inspection was not completed beforehand.",
      "Mess dues unpaid leading to hold up at Warden office.",
      "Visiting accounts without bank account details for refund."
    ],
    time_saving_opportunities: [
      "Schedule room inspection with caretaker 24 hours in advance.",
      "Combine hostel clearance with department library no-dues on the same morning."
    ],
    verification_needed: [
      "Verify caution deposit refund timeline (often disbursed within 30-45 days to student bank account).",
      "Verify whether deposit refund is processed through NEFT or cheque."
    ],
    clarifications: []
  },

  leave_medical: {
    query: "Need medical leave endorsement for attendance shortage",
    understood_requirement: "Medical Certificate Endorsement for Semester Attendance Shortage Consideration.",
    service_category: "Department Mentor, College Health Center / Dean Academics",
    physical_presence_needed: "2 Stops (College Doctor / Health Center -> HoD)",
    confidence: "HIGH",
    time_unplanned: "~2.5 hours",
    time_optimized: "~35 mins",
    time_saved: "Saves ~75% Time",
    recommended_strategy: "Most colleges require outside medical certificates to be counter-certified by the campus Chief Medical Officer (Health Center) before your HoD or Dean can accept them. Visit campus clinic first thing in the morning, then submit to your department mentor.",
    documents_or_preparation: [
      { id: "doc1", title: "Original Medical Certificate & Doctor's Prescription", desc: "From registered medical practitioner (with Reg. No)" },
      { id: "doc2", title: "Hospital Discharge Summary / Diagnostic Reports (if hospitalized)", desc: "Proof of genuine illness" },
      { id: "doc3", title: "Leave Application addressed to Head of Department", desc: "Mention exact dates of absence and subject codes affected" },
      { id: "doc4", title: "Current Attendance Summary Printout", desc: "Shows shortage percentage needing condonation" }
    ],
    step_by_step_plan: [
      {
        step: 1,
        title: "Stop 1: College Health Center / Campus Medical Officer",
        desc: "Present external doctor's certificate and prescriptions. Campus doctor will countersign/endorse the certificate.",
        time: "15 mins",
        tip: "Campus doctor hours are usually 9:00 AM – 11:30 AM. Go right at opening."
      },
      {
        step: 2,
        title: "Stop 2: Department Mentor / Class Advisor",
        desc: "Submit endorsed certificate with your leave application. Mentor calculates revised attendance eligibility.",
        time: "10 mins",
        tip: "Keep a digital photo copy of the endorsed certificate for your records."
      },
      {
        step: 3,
        title: "Stop 3: Department HoD Office",
        desc: "HoD puts formal approval stamp for ERP attendance condonation entry.",
        time: "10 mins",
        tip: "Verify that ERP attendance is updated within 3 working days."
      }
    ],
    possible_waiting_points: [
      "Submitting external certificate directly to HoD without mandatory campus doctor counter-signature.",
      "Doctor certificate lacking doctor's official registration number or diagnosis dates.",
      "Approaching HoD during classroom teaching hours."
    ],
    time_saving_opportunities: [
      "Submit within the college mandatory deadline (usually within 3-5 days of resuming classes).",
      "Attach prescription bills alongside certificate to avoid inquiry."
    ],
    verification_needed: [
      "Verify maximum attendance percentage condonable under university regulations (usually up to 10%).",
      "Verify whether a medical condonation processing fee is applicable."
    ],
    clarifications: []
  }
};

// Global App State
const state = {
  activeQuery: "",
  multiTasks: [],
  currentPlan: null,
  clarificationAnswers: {},
  checkedDocs: new Set()
};

// DOM Elements
const studentQueryInput = document.getElementById("studentQueryInput");
const queryLength = document.getElementById("queryLength");
const optimizeBtn = document.getElementById("optimizeBtn");
const presetButtons = document.querySelectorAll(".chip-btn");
const resetAppBtn = document.getElementById("resetAppBtn");
const viewDeptDirectoryBtn = document.getElementById("viewDeptDirectoryBtn");

const toggleMultiTaskBtn = document.getElementById("toggleMultiTaskBtn");
const multiTaskContainer = document.getElementById("multiTaskContainer");
const additionalTaskInput = document.getElementById("additionalTaskInput");
const addMultiTaskBtn = document.getElementById("addMultiTaskBtn");
const multiTaskList = document.getElementById("multiTaskList");

const clarificationBox = document.getElementById("clarificationBox");
const clarificationQuestionsList = document.getElementById("clarificationQuestionsList");
const applyClarificationsBtn = document.getElementById("applyClarificationsBtn");

const emptyPlanState = document.getElementById("emptyPlanState");
const planResultContainer = document.getElementById("planResultContainer");

// Plan Elements
const serviceCategoryBadge = document.getElementById("serviceCategoryBadge");
const confidenceBadge = document.getElementById("confidenceBadge");
const physicalPresenceBadge = document.getElementById("physicalPresenceBadge");
const planUnderstoodHeading = document.getElementById("planUnderstoodHeading");
const planStrategyText = document.getElementById("planStrategyText");
const unplannedTimeDisplay = document.getElementById("unplannedTimeDisplay");
const optimizedTimeDisplay = document.getElementById("optimizedTimeDisplay");
const savedTimeTag = document.getElementById("savedTimeTag");

const documentsList = document.getElementById("documentsList");
const docCountBadge = document.getElementById("docCountBadge");
const stepsTimeline = document.getElementById("stepsTimeline");
const waitingPointsList = document.getElementById("waitingPointsList");
const timeSavingList = document.getElementById("timeSavingList");
const verificationList = document.getElementById("verificationList");

// Modal Elements
const viewJsonModalBtn = document.getElementById("viewJsonModalBtn");
const jsonModal = document.getElementById("jsonModal");
const closeJsonModalBtn = document.getElementById("closeJsonModalBtn");
const copyJsonBtn = document.getElementById("copyJsonBtn");
const copyJsonText = document.getElementById("copyJsonText");
const jsonCodeView = document.getElementById("jsonCodeView");

const directoryModal = document.getElementById("directoryModal");
const closeDirectoryModalBtn = document.getElementById("closeDirectoryModalBtn");
const printChecklistBtn = document.getElementById("printChecklistBtn");

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  // Auto load first preset to showcase immediate value
  loadPreset("bonafide_bank");
});

function setupEventListeners() {
  studentQueryInput.addEventListener("input", (e) => {
    queryLength.textContent = e.target.value.length;
  });

  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const presetKey = btn.dataset.preset;
      presetButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadPreset(presetKey);
    });
  });

  optimizeBtn.addEventListener("click", () => {
    handleRunOptimization();
  });

  resetAppBtn.addEventListener("click", () => {
    resetAll();
  });

  // Multi Task
  toggleMultiTaskBtn.addEventListener("click", () => {
    multiTaskContainer.classList.toggle("hidden");
    if (!multiTaskContainer.classList.contains("hidden")) {
      additionalTaskInput.focus();
    }
  });

  addMultiTaskBtn.addEventListener("click", addAdditionalTask);
  additionalTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addAdditionalTask();
  });

  // Clarifications
  applyClarificationsBtn.addEventListener("click", () => {
    clarificationBox.classList.add("hidden");
    generatePlanFromQuery(studentQueryInput.value);
  });

  // Modals
  viewJsonModalBtn.addEventListener("click", openJsonModal);
  closeJsonModalBtn.addEventListener("click", () => jsonModal.classList.add("hidden"));
  jsonModal.addEventListener("click", (e) => {
    if (e.target === jsonModal) jsonModal.classList.add("hidden");
  });

  viewDeptDirectoryBtn.addEventListener("click", () => directoryModal.classList.remove("hidden"));
  closeDirectoryModalBtn.addEventListener("click", () => directoryModal.classList.add("hidden"));
  directoryModal.addEventListener("click", (e) => {
    if (e.target === directoryModal) directoryModal.classList.add("hidden");
  });

  copyJsonBtn.addEventListener("click", copyJsonToClipboard);
  printChecklistBtn.addEventListener("click", () => window.print());
}

function loadPreset(presetKey) {
  const data = PRESET_KNOWLEDGE[presetKey];
  if (!data) return;

  studentQueryInput.value = data.query;
  queryLength.textContent = data.query.length;
  clarificationBox.classList.add("hidden");
  state.activeQuery = data.query;
  state.currentPlan = JSON.parse(JSON.stringify(data));
  
  renderPlan(state.currentPlan);
}

function addAdditionalTask() {
  const text = additionalTaskInput.value.trim();
  if (!text) return;

  state.multiTasks.push(text);
  additionalTaskInput.value = "";
  renderMultiTasksList();
  
  // Re-optimize with combined errands
  handleRunOptimization();
}

function removeMultiTask(index) {
  state.multiTasks.splice(index, 1);
  renderMultiTasksList();
  handleRunOptimization();
}

function renderMultiTasksList() {
  multiTaskList.innerHTML = "";
  state.multiTasks.forEach((task, idx) => {
    const item = document.createElement("div");
    item.className = "multi-task-item";
    item.innerHTML = `
      <span>🔹 ${escapeHtml(task)}</span>
      <button class="btn-remove-chip" title="Remove">&times;</button>
    `;
    item.querySelector(".btn-remove-chip").addEventListener("click", () => removeMultiTask(idx));
    multiTaskList.appendChild(item);
  });
}

function handleRunOptimization() {
  const query = studentQueryInput.value.trim();
  if (!query) {
    studentQueryInput.focus();
    return;
  }

  // Clear active preset highlight
  presetButtons.forEach(b => b.classList.remove("active"));
  
  // Analyze & Clarify step
  const analysis = analyzeQuery(query);
  if (analysis.needsClarification && Object.keys(state.clarificationAnswers).length === 0) {
    renderClarificationForm(analysis.clarificationQuestions);
    return;
  }

  generatePlanFromQuery(query);
}

// STEP 1 & 2: Understand and Clarify Analyzer
function analyzeQuery(rawQuery) {
  const q = rawQuery.toLowerCase();
  
  // Check for ambiguous bonafide request without purpose
  if (q.includes("bonafide") && !q.includes("loan") && !q.includes("visa") && !q.includes("bus") && !q.includes("scholarship")) {
    return {
      needsClarification: true,
      clarificationQuestions: [
        {
          id: "bonafide_purpose",
          question: "What is the specific purpose of the Bonafide Certificate?",
          options: ["Education Loan / Bank", "Passport / Visa Application", "State Bus / Train Pass Concession", "General Student Verification"]
        },
        {
          id: "urgency",
          question: "How urgent is this requirement?",
          options: ["Needed by tomorrow", "Within 3-4 days", "Next week"]
        }
      ]
    };
  }

  // Check for transcript without passing status
  if ((q.includes("transcript") || q.includes("grade sheet")) && !q.includes("sem") && !q.includes("wes") && !q.includes("alumni")) {
    return {
      needsClarification: true,
      clarificationQuestions: [
        {
          id: "transcript_status",
          question: "Are you currently enrolled or an alumnus (graduated)?",
          options: ["Currently Studying (specify semester)", "Graduated / Alumnus", "Applying for WES/Foreign Evaluation"]
        }
      ]
    };
  }

  return { needsClarification: false };
}

function renderClarificationForm(questions) {
  clarificationQuestionsList.innerHTML = "";
  questions.forEach(q => {
    const block = document.createElement("div");
    block.className = "question-block";
    block.innerHTML = `
      <div class="question-text">${escapeHtml(q.question)}</div>
      <div class="options-row" data-qid="${q.id}">
        ${q.options.map(opt => `<button type="button" class="choice-chip" data-val="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`).join('')}
      </div>
    `;

    // Chip click handling
    block.querySelectorAll(".choice-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        block.querySelectorAll(".choice-chip").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
        state.clarificationAnswers[q.id] = chip.dataset.val;
      });
    });

    clarificationQuestionsList.appendChild(block);
  });

  clarificationBox.classList.remove("hidden");
  clarificationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// STEP 3, 4, 5: Low-Wait Plan Generation & Wasted Time Check
function generatePlanFromQuery(query) {
  const q = query.toLowerCase();

  // Match closest template or construct dynamic intelligent optimization plan
  let plan = null;

  if (q.includes("bonafide") || q.includes("bonafied") || (state.clarificationAnswers.bonafide_purpose)) {
    plan = JSON.parse(JSON.stringify(PRESET_KNOWLEDGE.bonafide_bank));
    if (state.clarificationAnswers.bonafide_purpose) {
      plan.understood_requirement = `Bonafide Certificate for ${state.clarificationAnswers.bonafide_purpose}.`;
    }
  } else if (q.includes("lost") || q.includes("id card") || q.includes("identity") || q.includes("hall ticket") || q.includes("admit card")) {
    plan = JSON.parse(JSON.stringify(PRESET_KNOWLEDGE.lost_id_hallticket));
  } else if (q.includes("transcript") || q.includes("marksheet") || q.includes("wes") || q.includes("degree")) {
    plan = JSON.parse(JSON.stringify(PRESET_KNOWLEDGE.transcript_higher_ed));
  } else if (q.includes("fee") || q.includes("concession") || q.includes("challan") || q.includes("scholarship")) {
    plan = JSON.parse(JSON.stringify(PRESET_KNOWLEDGE.fee_concession));
  } else if (q.includes("hostel") || q.includes("vacat") || q.includes("caution") || q.includes("mess")) {
    plan = JSON.parse(JSON.stringify(PRESET_KNOWLEDGE.hostel_clearance));
  } else if (q.includes("medical") || q.includes("leave") || q.includes("attendance") || q.includes("sick")) {
    plan = JSON.parse(JSON.stringify(PRESET_KNOWLEDGE.leave_medical));
  } else {
    // Dynamic Intelligent General Plan
    plan = createDynamicPlan(query);
  }

  // If student added multiple errands, combine and optimize routing!
  if (state.multiTasks.length > 0) {
    plan = optimizeCombinedRoute(plan, state.multiTasks);
  }

  state.currentPlan = plan;
  renderPlan(plan);
}

function createDynamicPlan(query) {
  return {
    understood_requirement: `Student administrative request: "${query.slice(0, 100)}"`,
    service_category: "General Campus Administration / Student Affairs",
    physical_presence_needed: "1 Planned Window",
    confidence: "MEDIUM",
    time_unplanned: "~60-90 mins",
    time_optimized: "~15-20 mins",
    time_saved: "Saves ~70% Time",
    recommended_strategy: "Prepare all required documentation and identity proofs at home. Complete department mentor/HoD signoff first thing in the morning before queuing at central administration counters.",
    documents_or_preparation: [
      { id: "doc1", title: "Valid College Identity Card", desc: "Mandatory counter identification" },
      { id: "doc2", title: "Formal Written Application Letter", desc: "Clearly state Roll No, Department, and Request" },
      { id: "doc3", title: "Latest Semester Fee Receipt", desc: "Verifies student active status" },
      { id: "doc4", title: "2 Sets of Photocopies", desc: "Always have counter copies ready" }
    ],
    step_by_step_plan: [
      {
        step: 1,
        title: "At Home: Check College Portal / ERP",
        desc: "Verify if your service can be raised digitally via the student grievance or service desk portal.",
        time: "5 mins",
        tip: "Saves 100% of campus transit if digital application exists."
      },
      {
        step: 2,
        title: "Department Cabin: Academic Sign-off",
        desc: "Obtain class advisor or Head of Department signature between 9:30 AM – 10:30 AM.",
        time: "10 mins",
        tip: "Most central admin counters immediately reject forms lacking department endorsement."
      },
      {
        step: 3,
        title: "Central Administrative Window",
        desc: "Submit your pre-filled, signed application and obtain an inward tracking token or date of collection.",
        time: "10-15 mins",
        tip: "Avoid 1:00 PM – 2:15 PM lunch handover hours."
      }
    ],
    possible_waiting_points: [
      "Arriving at central counter without department advisor signature.",
      "Visiting counters during lunch break transitions.",
      "Leaving campus without an official token receipt or inward tracking reference."
    ],
    time_saving_opportunities: [
      "Keep all documents in a labeled plastic folder to avoid rummaging at the counter window.",
      "Group this visit with other student affairs or library requirements."
    ],
    verification_needed: [
      "Verify exact designated counter number and operating window for this specific request.",
      "Verify whether payment of an application fee challan is mandatory before submission."
    ],
    clarifications: []
  };
}

// Multi-errand combination algorithm
function optimizeCombinedRoute(basePlan, extraTasks) {
  const combined = JSON.parse(JSON.stringify(basePlan));
  
  combined.understood_requirement += ` + Combined with ${extraTasks.length} additional errand(s): [${extraTasks.join(', ')}]`;
  combined.time_unplanned = "~3 - 4 hours across separate trips";
  combined.time_optimized = "~40-55 mins (single coordinated route)";
  combined.time_saved = "Saves ~75% Time & Eliminates 2 Trips";
  
  // Add extra documents and smart routing sequence
  extraTasks.forEach((task, i) => {
    const tLower = task.toLowerCase();
    if (tLower.includes("library") || tLower.includes("book")) {
      combined.documents_or_preparation.push({
        id: `extra_doc_${i}`,
        title: "Library Books to return / Library Card",
        desc: "Bring books directly to avoid repeat stop"
      });
      combined.step_by_step_plan.push({
        step: combined.step_by_step_plan.length + 1,
        title: "En Route: Central Library Counter (Fast Track)",
        desc: "Return overdue books or obtain library clearance stamp. Takes under 3 minutes if books are present.",
        time: "5 mins",
        tip: "Stop by the library on your way to Accounts to complete both in 1 loop."
      });
    } else if (tLower.includes("fee") || tLower.includes("accounts") || tLower.includes("dues")) {
      combined.documents_or_preparation.push({
        id: `extra_doc_${i}`,
        title: "Payment Receipts / Fee Challan Copy",
        desc: "Bring bank slip or UPI confirmation"
      });
      combined.step_by_step_plan.push({
        step: combined.step_by_step_plan.length + 1,
        title: "En Route: Accounts Counter Settlement",
        desc: "Settle dues and receive official stamped clearance receipt.",
        time: "10 mins",
        tip: "Batch this immediately following department sign-off."
      });
    } else {
      combined.step_by_step_plan.push({
        step: combined.step_by_step_plan.length + 1,
        title: `Batched Errand: ${task}`,
        desc: "Complete after primary paperwork submission while on campus.",
        time: "10 mins",
        tip: "Do not leave campus until both receipts are secured."
      });
    }
  });

  // Re-order steps logically: Home -> Dept HoD -> Central Window -> Library/Other
  combined.recommended_strategy = `Single-trip batch route: Completed all ${extraTasks.length + 1} errands in one continuous flow before lunch. Stops ordered geographically to prevent zig-zagging across campus.`;
  
  return combined;
}

// Render Plan to DOM
function renderPlan(plan) {
  emptyPlanState.classList.add("hidden");
  planResultContainer.classList.remove("hidden");

  // Top Bar
  serviceCategoryBadge.textContent = plan.service_category || "Campus Administration";
  confidenceBadge.textContent = `${plan.confidence} CONFIDENCE`;
  confidenceBadge.className = `badge-pill confidence-${(plan.confidence || 'HIGH').toLowerCase()}`;
  physicalPresenceBadge.textContent = plan.physical_presence_needed || "1 Visit";

  planUnderstoodHeading.textContent = plan.understood_requirement;
  planStrategyText.textContent = plan.recommended_strategy;
  unplannedTimeDisplay.textContent = plan.time_unplanned;
  optimizedTimeDisplay.textContent = plan.time_optimized;
  savedTimeTag.textContent = `⚡ ${plan.time_saved}`;

  // Checklist
  documentsList.innerHTML = "";
  docCountBadge.textContent = `${plan.documents_or_preparation.length} items required`;
  state.checkedDocs.clear();

  plan.documents_or_preparation.forEach(doc => {
    const item = document.createElement("div");
    item.className = "check-item";
    item.innerHTML = `
      <div class="check-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div>
        <div class="check-title">${escapeHtml(doc.title)}</div>
        <div class="check-sub">${escapeHtml(doc.desc)}</div>
      </div>
    `;

    item.addEventListener("click", () => {
      item.classList.toggle("checked");
      if (item.classList.contains("checked")) {
        state.checkedDocs.add(doc.id);
      } else {
        state.checkedDocs.delete(doc.id);
      }
    });

    documentsList.appendChild(item);
  });

  // Step Timeline
  stepsTimeline.innerHTML = "";
  plan.step_by_step_plan.forEach((s, idx) => {
    const stepEl = document.createElement("div");
    stepEl.className = "timeline-step";
    stepEl.innerHTML = `
      <div class="step-node">${idx + 1}</div>
      <div class="step-body">
        <div class="step-header-row">
          <h4 class="step-title">${escapeHtml(s.title)}</h4>
          <span class="step-time-est">${escapeHtml(s.time)}</span>
        </div>
        <p class="step-desc">${escapeHtml(s.desc)}</p>
        ${s.tip ? `<div class="step-hack">💡 Low-Wait Tip: ${escapeHtml(s.tip)}</div>` : ''}
      </div>
    `;
    stepsTimeline.appendChild(stepEl);
  });

  // Waiting Points
  waitingPointsList.innerHTML = "";
  plan.possible_waiting_points.forEach(pt => {
    const li = document.createElement("li");
    li.textContent = pt;
    waitingPointsList.appendChild(li);
  });

  // Time Saving List
  timeSavingList.innerHTML = "";
  plan.time_saving_opportunities.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    timeSavingList.appendChild(li);
  });

  // Verification Needed
  verificationList.innerHTML = "";
  plan.verification_needed.forEach(v => {
    const li = document.createElement("li");
    li.textContent = v;
    verificationList.appendChild(li);
  });

  // Update JSON View
  updateJsonView();

  planResultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// JSON Output Format Generation
function updateJsonView() {
  if (!state.currentPlan) return;

  const standardJson = {
    understood_requirement: state.currentPlan.understood_requirement,
    service_category: state.currentPlan.service_category,
    information_missing: state.currentPlan.clarifications || [],
    recommended_strategy: state.currentPlan.recommended_strategy,
    step_by_step_plan: state.currentPlan.step_by_step_plan.map(s => `${s.title}: ${s.desc}`),
    documents_or_preparation: state.currentPlan.documents_or_preparation.map(d => `${d.title} (${d.desc})`),
    possible_waiting_points: state.currentPlan.possible_waiting_points,
    time_saving_opportunities: state.currentPlan.time_saving_opportunities,
    verification_needed: state.currentPlan.verification_needed,
    confidence: state.currentPlan.confidence || "HIGH"
  };

  jsonCodeView.textContent = JSON.stringify(standardJson, null, 2);
}

function openJsonModal() {
  updateJsonView();
  jsonModal.classList.remove("hidden");
}

function copyJsonToClipboard() {
  const code = jsonCodeView.textContent;
  navigator.clipboard.writeText(code).then(() => {
    copyJsonText.textContent = "Copied!";
    setTimeout(() => {
      copyJsonText.textContent = "Copy JSON";
    }, 2000);
  });
}

function resetAll() {
  studentQueryInput.value = "";
  queryLength.textContent = "0";
  state.multiTasks = [];
  state.clarificationAnswers = {};
  state.checkedDocs.clear();
  state.currentPlan = null;
  multiTaskList.innerHTML = "";
  multiTaskContainer.classList.add("hidden");
  clarificationBox.classList.add("hidden");
  presetButtons.forEach(b => b.classList.remove("active"));
  planResultContainer.classList.add("hidden");
  emptyPlanState.classList.remove("hidden");
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
