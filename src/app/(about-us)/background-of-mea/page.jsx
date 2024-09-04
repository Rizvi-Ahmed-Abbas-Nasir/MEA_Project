import React from 'react'
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

const page = () => {
  return (
    <>
    <Header />
    <main>
      <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
        <h1 className="text-5xl p-3">Background of MEA</h1>
        <p className="text-lg p-3"> About us / Background of MEA</p>
      </section>
      <section className='py-10 px-10 '>
        <div className='flex gap-7 py-5 flex-col md:flex-row'>
          <div className='md:w-[50%]'>
            <p className='  first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900  first-letter:me-3 first-letter:float-start text-justify'>Dear Engineer Friends,
              <br />
              It is an established fact that some engineers who run businesses under the name of Brihanmumbai Engineers Union become active in December by showing false promises. Before <span className='font-bold text-white px-1 bg-[#C72626]'>Mr. Sadashivrao Tinaykar</span> became the Municipal Commissioner, the maintenance, repair, and renovation of various equipment in municipal hospitals and dispensaries were managed through the administration. Upon taking office, Mr. Tinaykar observed that some officials were causing financial losses to the municipality. Consequently, he established a separate department for the maintenance, repair, and renovation of equipment in all hospitals and dispensaries. This department was entrusted to Engineer Divekar and his team. Engineer Divekar and his team managed their responsibilities diligently and repaired many pieces of equipment in municipal hospitals at a lower cost. However, some officials filed complaints against Engineer Divekar and his team. Although Mr. Sadashivrao Tinaykar did not take any action, he later began some conspiracies. 
              <br />
              <br />
              <span className='font-bold text-white px-1 bg-[#C72626]'>Mr. M. R. Shah</span> filed a complaint against Engineer Divekar. Shah had acted out of personal animosity. This led to a wave of anger among the engineers of Mumbai Municipal Corporation. Due to the inactive policies of Brihanmumbai Engineers Union, some engineers left the union in 1990. Subsequently, under the leadership of Mr. Sharad Rao and Adv. Mahabal Shetty, the 'Municipal Engineers Association' was established. For the past 22 years, the Municipal Workers Union and affiliated organizations have secured salary increases, allowances, service facilities, and bonuses for engineers. Social security has been provided to engineers, and they have fought for their rights, with many demands being met. Some new engineers have joined the municipality, and this special newsletter has been published to prevent any confusion for them.</p>
          </div>
          <div className='md:w-[50%]'>
            <img className='w-full h-full object-cover' src="assets/images/bg-1.webp" alt="" />
          </div>
        </div>

        <div className='flex gap-7 py-5 flex-col md:flex-row'>
          <div className='md:w-[50%]'>
            <img className='w-full h-full object-cover' src="assets/images/bg2.jpeg" alt="" />
          </div>
          <div className='md:w-[50%]'>
            <p> The struggles undertaken by the Municipal Engineers Association have yielded numerous results. For instance, promotion policies have been established, increases in salary, allowances, and service facilities have been achieved, and a decision was made to retain positions for degree-holding engineers. Compensation allowances were secured for engineers working in external departments. The five-year experience requirement for 103 junior engineers was relaxed. Secondary engineers in the roads department were not penalized. The demand for engineers to conduct their own inquiries was accepted. Engineers were freed from harassment by vigilance agencies. Protection was provided against attacks from engineers, municipal councilors, and troublemakers. Efforts are underway to create a law for engineers.
              <br />
              <br />
              Efforts are ongoing for the implementation of the <span className='font-bold text-white px-1 bg-[#C72626]'>2010 agreement</span> These include applying salary scales for equivalent positions in central government, reinstating vehicle allowances, granting full technical rights to executive engineers, filling all cadre vacancies, filling the post of assistant engineers from among senior municipal engineers, filling vacancies for sub-commissioner (environment and public health), providing continuous duty to departmental engineers, offering house rent allowance like fire brigade officers, and increasing the retirement age to 60. The association celebrates March 22 as 'World Water Day' every year. A 'Water' issue is published, and funds raised through this issue are used to provide medical aid to needy members. Two ambulances have been inaugurated.</p>
          </div>
        </div>
        <p className='pt-5'>
        The Municipal Engineers Association, Mumbai, working for the welfare of engineers, is the organization that can ensure justice for all of you. Do not fall prey to misleading leaders in December every year. To avoid labor-unfriendly agreements, prevent financial losses, and secure salary scales similar to those in the central government, fill out the membership form for the Municipal Engineers Association, Mumbai (Code 50) and become a member. The organization can help you obtain justice. The organization, which has been working alongside the Municipal Workers Union, Mumbai, and the Municipal Nursing and Paramedical Staff Union, is strong. This special newsletter has been published to provide information about the contributions made by the organization for engineers, workers, and employees.
        </p>
      </section>
    </main>
    <Footer />
    </>
  );

}

export default page