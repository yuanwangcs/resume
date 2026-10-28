var Resume = React.createClass({displayName: "Resume",
    getInitialState: function() {
        return { language: "en" };
    },
    componentDidMount: function() {
        this.updateDocumentLanguage();
    },
    componentDidUpdate: function() {
        this.updateDocumentLanguage();
    },
    updateDocumentLanguage: function() {
        document.documentElement.lang = this.state.language === "zh" ? "zh-CN" : "en";
        document.title = this.state.language === "zh" ? "袁旺 | 学术简历" : "Yuan Wang | Academic Resume";
    },
    setLanguage: function(language) {
        this.setState({ language: language });
    },
    render: function() {
        var language = this.state.language;
        var translations = this.props.resume.translations || {};
        var resume = translations[language] || this.props.resume;
        var header_style = {
            backgroundImage: this.props.resume.background_image ? "url(link)".replace('link', this.props.resume.background_image) : ""
        }
        var sections = resume.sections || []

        return (
            React.createElement("div", {className: "resume-container animated fadeInUp"},
                React.createElement("header", {style: header_style},
                    React.createElement("div", {className: "language-switch", role: "group", "aria-label": language === "zh" ? "语言" : "Language"},
                        React.createElement("button", {type: "button", lang: "zh-CN", "aria-pressed": language === "zh", onClick: this.setLanguage.bind(this, "zh")}, "中文"),
                        React.createElement("span", {"aria-hidden": "true"}, "/"),
                        React.createElement("button", {type: "button", lang: "en", "aria-pressed": language === "en", onClick: this.setLanguage.bind(this, "en")}, "English")
                    ),
                    !this.props.resume.avatar ? "" :
                        React.createElement("div", {className: "avatar-frame"},
                            React.createElement("img", {className: "avatar", src: this.props.resume.avatar, alt: resume.basicinfo.name})
                        )

                ),
                React.createElement(BasicInfo, {basicinfo: resume.basicinfo}),
                React.createElement(Social, {social: this.props.resume.social}),
                sections.map(function(section){
                    return (
                        React.createElement(ExperienceList, {type: section.title, experiences: section.experiences, key: section.title})
                    )
                })
            )
        )
    }
});

var BasicInfo = React.createClass({displayName: "BasicInfo",
    render: function(){

        return (
            React.createElement("section", {className: "basicinfo"},
                React.createElement("div", {className: "text-info name"},
                    this.props.basicinfo.name
                ),
                React.createElement("div", {className: "text-info description"},
                    this.props.basicinfo.description
                ),
                !this.props.basicinfo.affiliation ? "" :
                    React.createElement("div", {className: "text-info"},
                        React.createElement("i", {className: "fa fa-university"}),
                        this.props.basicinfo.affiliation
                    ),

                !this.props.basicinfo.discipline ? "" :
                    React.createElement("div", {className: "text-info"},
                        React.createElement("i", {className: "fa fa-graduation-cap"}),
                        this.props.basicinfo.discipline
                    ),

                !this.props.basicinfo.research_interests ? "" :
                    React.createElement("div", {className: "text-info interests"},
                        React.createElement("i", {className: "fa fa-lightbulb-o"}),
                        this.props.basicinfo.research_interests
                    ),

                React.createElement("div", {className: "phone text-info inline-block"},
                    !this.props.basicinfo.phone ? "" :
                        React.createElement("div", null,
                            React.createElement("i", {className: "fa fa-phone"}),
                            React.createElement("a", {href: "tel:" + this.props.basicinfo.phone}, this.props.basicinfo.phone)
                        )

                ),
                React.createElement("div", {className: "email text-info inline-block"},
                    !this.props.basicinfo.email ? "" :
                        React.createElement("div", null,
                            React.createElement("i", {className: "fa fa-envelope-o"}),
                            React.createElement("a", {href: "mailto:" + this.props.basicinfo.email}, this.props.basicinfo.email)
                        )

                )
            )
        )
    }
})

var Social = React.createClass({displayName: "Social",
    render: function(){
        if(!this.props.social || !this.props.social.length){
            return React.createElement("section", {className: "social"})
        }
        return (
            React.createElement("section", {className: "social"},
                this.props.social.map(function(item){
                    //如果有icon 优先使用icon
                    if(!item.icon){
                        return (
                            React.createElement("a", {className: 'fa fa-' + item.type, href: item.link, key: item.type + item.link})
                        )
                    }
                    return (
                        React.createElement("a", {href: item.link, key: item.type + item.link},
                            React.createElement("img", {src: item.icon})
                        )
                    )

                })
            )

        );
    }
})

var ExperienceList = React.createClass({displayName: "ExperienceList",
    render: function(){
        if(!this.props.experiences || !this.props.experiences.length){
            return React.createElement("div", null)
        }
        return (
            React.createElement("section", {className: "experiencelist"},
                React.createElement("div", {className: "experience-type"},
                    this.props.type
                ),
                this.props.experiences.map(function(experience){
                    return (
                        React.createElement(Experience, {experience: experience, key: experience.name})
                    )
                })
            )
        )
    }
})

var Experience  = React.createClass({displayName: "Experience",
    render: function(){
        return (
            React.createElement("section", {className: this.props.experience.icon ? "experience has-icon" : "experience"},
                React.createElement("div", {className: "clearfix item"},
                    (function(icon){
                        if(icon && icon != ''){
                            return (
                                React.createElement("div", {className: "icon fl"},
                                    React.createElement("img", {src: icon})
                                )
                            )
                        }
                    })(this.props.experience.icon),

                    React.createElement("div", {className: "fl name-title"},
                        React.createElement("div", {className: "name"},
                            !this.props.experience.name_link ?
                                React.createElement("a", null, this.props.experience.name) :
                                React.createElement("a", {href: this.props.experience.name_link}, this.props.experience.name),

                            !this.props.experience.name_link ? "" :
                                React.createElement("i", {className: "fa fa-link"})

                        ),
                        React.createElement("div", {className: "title"},
                            this.props.experience.title
                        )
                    ),
                    !this.props.experience.time && !this.props.experience.location ? "" :
                        React.createElement("div", {className: "fr time-location"},
                            React.createElement("div", {className: "time"},
                                this.props.experience.time
                            ),
                            React.createElement("div", {className: "location"},
                                !this.props.experience.location ? "" :
                                    React.createElement("div", null,
                                        React.createElement("i", {className: "fa fa-map-marker"}),
                                        this.props.experience.location
                                    )

                            )
                        )

                ),
                !this.props.experience.description ? "" :
                    React.createElement("div", {className: "description"},
                        this.props.experience.description
                    )

            )
        )
    }
})

fetch('/resume/data/resume.json?v=20261028-i18n')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    React.render( React.createElement(Resume, {resume: json}) , document.getElementById('container'));
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
