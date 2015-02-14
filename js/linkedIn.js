
	var onLinkedInLoad = function() {
        IN.Event.on(IN, "auth", getProfileData);
    };

    // Handle the successful return from the API call
    function onSuccess(data) {
        console.log(data); 
        var edu = [], certi = [], pos = [], skill = [], somthing = [] ;
        for(var i=0; i<data.values[0].educations.values.length;i++){
        	console.log(data.values[0].educations.values[i]);
            var educationInfo = {
                degree : data.values[0].educations.values[i].degree,
                fieldOfStudy : data.values[0].educations.values[i].fieldOfStudy,
                startDate : data.values[0].educations.values[i].startDate.year,
                endDate : data.values[0].educations.values[i].endDate.year,
                isCurrent: data.values[0].positions.values[0].isCurrent,
                title: data.values[0].positions.values[0].title
            };
            edu[i] = educationInfo;
        }
        for(var j=0; j<data.values[0].certifications.values.length;j++){
            var certificateInfo = {
                certificate1 : data.values[0].certifications.values[j].name
            };
            certi[j] = certificateInfo;
        }

        for(var k=0; k<data.values[0].positions.values.length;k++){
            var positionInfo = {
                companyName : data.values[0].positions.values[k].company.name,
                startDate : data.values[0].positions.values[0].startDate,
                summary : data.values[0].positions.values[0].summary,

            };
            pos[k] = positionInfo;
        }

        /* Skills*/
        for(var m=0;m<data.values[0].skills.values.length;m++){
            skill[m] = data.values[0].skills.values[m].skill.name;
        }

        var completeInfo = {
        	name : data.values[0].firstName + " " + data.values[0].lastName,
        	mailId : data.values[0].emailAddress,
        	address : data.values[0].mainAddress,
        	phone : data.values[0].phoneNumbers.values[0],
            education : edu,
            certifications : certi,
            positions: pos,
            skills: skill
        };
        console.log(completeInfo);
        $('#myModal').modal('show');
        $('.firstName').val(data.values[0].firstName + " " + data.values[0].lastName);
        $('.mailId').val(data.values[0].emailAddress);
        $('.address').val(data.values[0].mainAddress);
        for(var q=0; q<data.values[0].skills.values.length; q++){
            somthing[q]= data.values[0].skills.values[q].skill.name; 
        }
     
        for(var p=0; p<data.values[0].positions.values.length; p++){
            if(data.values[0].positions.values[p].isCurrent){
                $('.positionList').append("<form class='form-inline'> <div class='form-group'> Current: <input type='text' value='"+  data.values[0].positions.values[p].company.name +"' class='form-control' disabled> </div> <div class='form-group'> Since : <input type='text' value=' Month/Year : " +  data.values[0].positions.values[p].startDate.month + "/" + data.values[0].positions.values[p].startDate.year +"' class='form-control' disabled></div> <div class='form-group'> Designation : <input type='text' value='" +  data.values[0].positions.values[p].title +"' class='form-control' disabled></div><hr/> </form> Summary : <textarea class='form-control summary' rows='6' disabled >" + data.values[0].positions.values[p].summary  +"' </textarea> <hr/>Skill Set: <textarea class='form-control summary' rows='4' disabled >'" + somthing.toString() +"' </textarea>");
            } else {
                 $('.positionList').append("<form class='form-inline'> <div class='form-group'> Current: <input type='text' value='"+  data.values[0].positions.values[p].company.name +"' class='form-control' disabled> </div> <div class='form-group'> From : <input type='text' value=' Month/Year : " +  data.values[0].positions.values[p].startDate.month + "/" + data.values[0].positions.values[p].startDate.year +"' class='form-control' disabled></div> <div class='form-group'> To : <input type='text' value=' Month/Year : " +  data.values[0].positions.values[p].endDate.month + "/" + data.values[0].positions.values[p].endDate.year +"' class='form-control' disabled></div> <hr/><div class='form-group'> Designation : <input type='text' value='" +  data.values[0].positions.values[p].title +"' class='form-control' disabled></div><hr/> </form> Summary : <textarea class='form-control summary' rows='6' disabled >" + data.values[0].positions.values[p].summary  +"' </textarea><hr/>Skill Set: <textarea class='form-control summary' rows='4' disabled >'" + somthing.toString() +"' </textarea>");
            }
        }
    




    }
    
    // Handle an error response from the API call
    function onError(error) {
        console.log(error);
    }

    // Use the API call wrapper to request the member's basic profile data
    function getProfileData() {
        IN.API.Profile("me").fields([ "id","firstName", "location","lastName","skills","positions","educations","languages","phone-numbers","certifications","emailAddress","mainAddress"]).result(onSuccess).error(onError);
        // IN.API.Raw("/people/~").result(onSuccess).error(onError);
    }