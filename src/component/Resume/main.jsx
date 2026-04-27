var Resume = React.createClass({
    render: function() {
        var header_style = {
            backgroundImage: this.props.resume.background_image ? "url(link)".replace('link', this.props.resume.background_image) : ""
        }
        var sections = this.props.resume.sections || []

        return (
            <div className="resume-container animated fadeInUp">
                <header style={header_style}>
                    {!this.props.resume.avatar ? "" :
                        <img className="avatar" src={this.props.resume.avatar} />
                    }
                </header>
                <BasicInfo basicinfo={this.props.resume.basicinfo}/>
                <Social social={this.props.resume.social}/>
                {sections.map(function(section){
                    return (
                        <ExperienceList type={section.title} experiences={section.experiences} key={section.title}/>
                    )
                })}
            </div>
        )
    }
});

var BasicInfo = React.createClass({
    render: function(){

        return (
            <section className="basicinfo" >
                <div className="text-info name">
                    {this.props.basicinfo.name}
                </div>
                <div className="text-info description">
                    {this.props.basicinfo.description}
                </div>
                {!this.props.basicinfo.affiliation ? "" :
                    <div className="text-info">
                        <i className="fa fa-university"></i>
                        {this.props.basicinfo.affiliation}
                    </div>
                }
                {!this.props.basicinfo.discipline ? "" :
                    <div className="text-info">
                        <i className="fa fa-graduation-cap"></i>
                        {this.props.basicinfo.discipline}
                    </div>
                }
                {!this.props.basicinfo.research_interests ? "" :
                    <div className="text-info interests">
                        <i className="fa fa-lightbulb-o"></i>
                        {this.props.basicinfo.research_interests}
                    </div>
                }
                <div className="phone text-info inline-block">
                    {!this.props.basicinfo.phone ? "" :
                        <div>
                            <i className="fa fa-phone"></i>
                            <a href={"tel:" + this.props.basicinfo.phone}>{this.props.basicinfo.phone}</a>
                        </div>
                    }
                </div>
                <div className="email text-info inline-block">
                    {!this.props.basicinfo.email ? "" :
                        <div>
                            <i className="fa fa-envelope-o"></i>
                            <a href={"mailto:" + this.props.basicinfo.email}>{this.props.basicinfo.email}</a>
                        </div>
                    }
                </div>
            </section>
        )
    }
})

var Social = React.createClass({
    render: function(){
        if(!this.props.social || !this.props.social.length){
            return <section className="social"></section>
        }
        return (
            <section className="social">
                {this.props.social.map(function(item){
                    //如果有icon 优先使用icon
                    if(!item.icon){
                        return (
                            <a className={'fa fa-' + item.type} href={item.link} key={item.type + item.link}></a>
                        )
                    }
                    return (
                        <a href={item.link} key={item.type + item.link}>
                            <img src={item.icon}/>
                        </a>
                    )

                })}
            </section>

        );
    }
})

var ExperienceList = React.createClass({
    render: function(){
        if(!this.props.experiences || !this.props.experiences.length){
            return <div></div>
        }
        return (
            <section className="experiencelist">
                <div className="experience-type">
                    {this.props.type}
                </div>
                {this.props.experiences.map(function(experience){
                    return (
                        <Experience experience={experience} key={experience.name}/>
                    )
                })}
            </section>
        )
    }
})

var Experience  = React.createClass({
    render: function(){
        return (
            <section className="experience">
                <div className="clearfix item">
                    {(function(icon){
                        if(icon && icon != ''){
                            return (
                                <div className="icon fl">
                                    <img src={icon}/>
                                </div>
                            )
                        }
                    })(this.props.experience.icon)}

                    <div className="fl name-title">
                        <div className="name">
                            {!this.props.experience.name_link ?
                                <a>{this.props.experience.name}</a> :
                                <a href={this.props.experience.name_link}>{this.props.experience.name}</a>
                            }
                            {!this.props.experience.name_link ? "" :
                                <i className="fa fa-link"></i>
                            }
                        </div>
                        <div className="title">
                            {this.props.experience.title}
                        </div>
                    </div>
                    {!this.props.experience.time && !this.props.experience.location ? "" :
                        <div className="fr time-location">
                            <div className="time">
                                {this.props.experience.time}
                            </div>
                            <div className="location">
                                {!this.props.experience.location ? "" :
                                    <div>
                                        <i className="fa fa-map-marker"></i>
                                        {this.props.experience.location}
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
                {!this.props.experience.description ? "" :
                    <div className="description">
                        {this.props.experience.description}
                    </div>
                }
            </section>
        )
    }
})

fetch('/resume/data/resume.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    React.render( <Resume resume={json} /> , document.getElementById('container'));
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
