# Accordion

## Installation

See the [main README quick start guide](https://github.com/alphagov/govuk-frontend#quick-start) for how to install this component.

## Guidance and Examples

Find out when to use the accordion component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/accordion).

## Component options

Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.

See [options table](https://design-system.service.gov.uk/components/accordion/#options-accordion-example) for details.


params: {
   
    {
        "name": "summary.text",
        "type": "string",
        "required": false,
        "description": "Text content for summary line. If `summary.html` is supplied, this is ignored."
    },
    {
        "name": "summary.html",
        "type": "string",
        "required": false,
        "description": "HTML content for summary line."
    },
}

 {{ pinsStepByStepNavigation({
            id: "blahblah",
            useIPDefaultStepByStep: true,
            currentDefaultStep: 1,
            heading: "The Nationally Significant Infrastructure planning process step by step",
            headingContainsLink: true,
            steps: [
                {
                    heading: {
                        text: "Pre-application"
                    },
                    content: {
                        text: "blah blah blah"
                    },
                    isActive: true,
                    isOrStep: true,
                    subList: [
                        {
                            text: "This is the first link",
                            href: "#",
                            isActive: true
                        },
                        {
                            text: "This is the second link",
                            href: "#"
                        },
                        {
                            text: "This is the third link",
                            href: "#"
                        }
                    ]
                }
            ]        
        }) }}


## Code snippet for items
<li aria-current="step" data-show id="REPLACETHISWITHID" class="app-step-nav__step
    {% if params.currentDefaultStep == 1 %} 
        data-class='app-step-nav__step--active'
    {% endif %} 
    ">
        <div class="app-step-nav__header " data-position="1">
            <h3 class="app-step-nav__title">
            <span class="app-step-nav__circle app-step-nav__circle--number">
                <span class="app-step-nav__circle-inner">
                <span class="app-step-nav__circle-background">
                    <span class="app-step-nav__circle-step-label govuk-visually-hidden">Step</span> 1
                    <span class="app-step-nav__circle-step-colon govuk-visually-hidden" aria-hidden="true">:</span>
                </span>
                </span>
            </span>
            <span>
                REPLACETHISWITHHEADING
            </span>
            </h3>
        </div>
        <div class="app-step-nav__panel js-panel" id="step-panel-REPLACETHISWITHID-1">
            <p class="app-step-nav__paragraph">Before the developer sends their application to the Planning Inspectorate, they must carry out a public consultation.</p>
            <p class="app-step-nav__paragraph"><a href="#" class="app-step-nav__link">Find out how to get involved before the planning project is submitted to the Planning Inspectorate</a></p>
        </div>
    </li>