var Resume = React.createClass({displayName: "Resume",
    render: function() {
        var header_style = {
            backgroundImage: this.props.resume.background_image ? "url(link)".replace('link', this.props.resume.background_image) : ""
        }
        var sections = this.props.resume.sections || []

        return (
            React.createElement("div", {className: "resume-container animated fadeInUp"}, 
                React.createElement("header", {style: header_style}, 
                    !this.props.resume.avatar ? "" :
                        React.createElement("img", {className: "avatar", src: this.props.resume.avatar})
                    
                ), 
                React.createElement(BasicInfo, {basicinfo: this.props.resume.basicinfo}), 
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
            React.createElement("section", {className: "experience"}, 
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

fetch('/resume/data/resume.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    React.render( React.createElement(Resume, {resume: json}) , document.getElementById('container'));
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

