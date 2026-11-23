import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../../styles/hr.css'
import { candidates, nav, SideIcon } from './HrShared'
import { DashboardPage } from './screens/DashboardPage'
import { VacancyListPage, VacancyEditorPage } from './screens/VacanciesPage'
import { AllApplicantsPage, ApplicantsPage } from './screens/ApplicantsPage'
import { CandidateReviewPage, ApplicantDecisionPage, ShortlistedPage, ApplicantEvidencePage } from './screens/CandidatePages'
import { CompanyProfilePage } from './screens/CompanyProfilePage'
import { VerificationPage } from './screens/VerificationPage'
export default function HrWorkspace(){
 const loc=useLocation(),navigate=useNavigate(),[tab,setTab]=useState('All'),[search,setSearch]=useState(''),[selected,setSelected]=useState('Aina Rahman'),[selectedRole,setSelectedRole]=useState('Junior Software Developer'),[experience,setExperience]=useState('Not required'),[assistant,setAssistant]=useState('Home'),[assistantOpen,setAssistantOpen]=useState(false),[notice,setNotice]=useState(''),[companyFile,setCompanyFile]=useState(''),[authorityFile,setAuthorityFile]=useState(''),[shortlistedNames,setShortlistedNames]=useState(['Daniel Tan','Farah Lee']),[vacancyFilter,setVacancyFilter]=useState('All statuses'),[vacancySelectorOpen,setVacancySelectorOpen]=useState(false),[vacancySearch,setVacancySearch]=useState('')
 const page=loc.pathname.replace(/^\/hr\/?/,'')||'dashboard',candidate=candidates.find(c=>c.name===selected&&c.role===selectedRole)||candidates.find(c=>c.name===selected)||candidates[2]
 const filtered=useMemo(()=>candidates.filter(c=>(tab==='All'||c.state===tab)&&`${c.name} ${c.role} ${c.skills}`.toLowerCase().includes(search.toLowerCase())),[tab,search])
 const go=r=>navigate(`/hr/${r}`),flash=m=>{setNotice(m);window.setTimeout(()=>setNotice(''),2600)},active=r=>r===page||(r==='applicants/all'&&page.startsWith('applicants'))||(r==='applicants'&&(page.startsWith('applicants')||page==='shortlisted'))||(r==='vacancy/new'&&page.startsWith('vacancy'))||(r==='verification/1'&&page.startsWith('verification'))
 const sidebarItems=page.startsWith('verification')?[['dashboard','Recruiter dashboard','home'],['vacancies','Vacancies','briefcase'],['applicants','Applicants','person'],['verification/1','Company verification','building']]:nav
 const sidebar=<aside className="hr-sidebar"><Link className="hr-brand" to="/hr/dashboard"><img src="/admin-icons/logo-mark.svg" alt=""/><span>SkillBridge AI</span></Link><div className="hr-nav-label">HR / RECRUITER</div><nav className={page.startsWith('verification')?'hr-verification-nav':''}>{sidebarItems.map(([to,label,icon])=><button key={to} className={`hr-nav-item ${active(to)?'active':''}`} onClick={()=>go(to)}><span className={`hr-nav-icon ${icon}`} aria-hidden="true"><SideIcon type={icon}/></span>{label}</button>)}</nav><section className="hr-demo"><div className="hr-nav-label">DEMO WORKSPACE</div><div className="hr-demo-name">Maya Lim</div><button className="hr-signout" onClick={()=>navigate('/login')}>Sign out <span>→</span></button></section></aside>
 function vacancyPicker(value){const options=[{name:'All vacancies',detail:'Applications across every vacancy',route:'applicants/all'},{name:'Junior Software Developer',detail:'Melaka · Published · 12 applications',route:'applicants'},{name:'Graduate QA Analyst',detail:'Kuala Lumpur · Published · 6 applications',route:'applicants/graduate'}],matches=options.filter(x=>(x.name+' '+x.detail).toLowerCase().includes(vacancySearch.toLowerCase()));return <><button type="button" className="hr-vacancy-picker-trigger" onClick={()=>{setVacancySearch('');setVacancySelectorOpen(true)}}>{value}<span aria-hidden="true">⌄</span></button>{vacancySelectorOpen&&<div className="hr-vacancy-picker-overlay" onClick={()=>setVacancySelectorOpen(false)}><section className="hr-vacancy-picker-dialog" role="dialog" aria-modal="true" aria-label="Choose vacancy" onClick={e=>e.stopPropagation()}><h2>Choose vacancy</h2><input autoFocus className="hr-vacancy-picker-search" placeholder="Search by job title or location" value={vacancySearch} onChange={e=>setVacancySearch(e.target.value)}/><div className="hr-vacancy-picker-results">{matches.length?matches.map(x=><button key={x.name} onClick={()=>{setVacancySelectorOpen(false);go(x.route)}}><strong>{x.name}</strong><span>{x.detail}</span></button>):<div className="hr-vacancy-picker-empty"><strong>No vacancies found</strong><span>Try another job title or location, or clear your search.</span></div>}</div><button className="hr-vacancy-picker-action" onClick={()=>setVacancySelectorOpen(false)}>Cancel</button>{vacancySearch&&<button className="hr-vacancy-picker-action" onClick={()=>setVacancySearch('')}>Clear search</button>}</section></div>}</>} const ctx={page,candidate,filtered,tab,setTab,search,setSearch,selected,setSelected,selectedRole,setSelectedRole,experience,setExperience,assistant,setAssistant,assistantOpen,setAssistantOpen,companyFile,setCompanyFile,authorityFile,setAuthorityFile,shortlistedNames,setShortlistedNames,vacancyFilter,setVacancyFilter,go,flash,vacancyPicker}
 let content=page==='dashboard'?<DashboardPage {...ctx}/>:page==='vacancies'?<VacancyListPage {...ctx}/>:page.startsWith('vacancy/new')||page.startsWith('vacancy/edit')?<VacancyEditorPage {...ctx}/>:page==='applicants/all'?<AllApplicantsPage {...ctx}/>:page==='applicants'||page==='applicants/graduate'||page==='applicants/after-shortlist'?<ApplicantsPage {...ctx}/>:page==='applicants/review'||page==='applicants/shortlisted-review'?<CandidateReviewPage {...ctx}/>:page==='applicants/shortlist'?<ApplicantDecisionPage {...ctx}/>:page==='applicants/reject'?<ApplicantDecisionPage {...ctx} reject/>:page==='shortlisted'?<ShortlistedPage {...ctx}/>:page==='company'?<CompanyProfilePage {...ctx}/>:page.startsWith('verification')?<VerificationPage {...ctx}/>:page==='evidence'?<ApplicantEvidencePage {...ctx}/>:<DashboardPage {...ctx}/>
 return <div className="hr-shell">{sidebar}<main className="hr-main"><div className={`hr-content ${page==='dashboard'?'hr-dashboard-content':''}`}>{page!=='dashboard'&&<div className="hr-dashboard-context"><span>{page.startsWith('verification')?'HR / RECRUITER　·　Maya Lim':'HR / RECRUITER'}</span><span>{page.startsWith('verification')?'':(page.startsWith('applicants')||page==='evidence')?'Maya Lim　·　Straits Digital':'Maya Lim　·　HR / RECRUITER'}</span></div>}{content}</div></main>{notice&&<div className="hr-toast">✓　{notice}</div>}</div>
}























