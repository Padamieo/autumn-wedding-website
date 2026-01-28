'use client'

export default function FAQ() {

  const faqs = [
    {
      question: 'When is the RSVP deadline?',
      answer: 'tbd we need to give a date'
    },
    {
      question: 'What is the plan?',
      answer: 'We have hired a venue from friday night to sunday morning, we hope to accomidate as many as possible. The ceremony will be held on the saturday at the "hide", with wedding breakfast and reception in the "large barn". All within the venue grounds'
    },
    {
      question: 'How do I get to the venue?',
      answer: 'The should be plenty of parking if you want to drive. For those comming abroad Gatwick is the closest airport. '
    },
    {
      question: 'What is the dress code?',
      answer: 'Although its a halloween wedding, its not a costume party, its a formal event, to be in theme we are thinking autumunal colors, but at the end of the day we trust you. Weather permitting we hope to hold the ceremony outdoors and on grass so sensible shoes would be advised.'
    },
    {
      question: 'What is the weather like?',
      answer: 'We are hoping for an outdoor ceremony, weather permitting, other parts will be held indoors. Autumn in the UK can be cold and rainy so sensible shoes would be advised. We will fall back to a indoor location if we have to, umbrellas will be suppied but we are a hardy outdoor bunch so make sure you have something to keep warm if necessery.'
    },
    {
      question: 'Can I bring plus one',
      answer: 'we have limited space so can only really accomidate named invitees at current'
    },
    {
      question: 'What is a the food situation?',
      answer: 'Breakfast will be supplied saturday and sunday, friday evening will be tbd for when you arrive. Ceremony day itself will be catored by homegurrown, who will provide canapes, wedding breakfast and evening food.'
    },
    {
      question: 'What is a the drink situation?',
      answer: 'We will supply wine / bubbles / beer / and non-alcholic varieits on the ceremony day, however if the is a specific drink you\'d like to consume your welcome to bring it.'
    },
    {
      question: 'Is there a gift registery?',
      answer: 'No! and please dont bring gifts or money to the venue. We have been together for 16 years we have everything we need, including multiple bottle openers. Your presence is the gift we\'re after!'
    },
    {
      question: 'What is the cost accomidation?',
      answer: 'Although we would love to pay for everyone, it would be appriciate if guests help us cover a little of the cost'
    },
  ]

  return (
    <div id="faq">
      <div className="px-4 sm:px-0">
        <h2 className="text-base/7 font-semibold text-gray-900">Frequently Asked Questions.</h2>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">If you can't find an answer here to a question you have; please just message us directly.</p>
      </div>
      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-300">
          {faqs.map((item, i) => (
            <div key={`faq-${i}`} id={`faq-${i}`} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
