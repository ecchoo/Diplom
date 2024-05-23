import { Badge } from "@/UI"
import { Badges, Card, TeacherBio, TeacherInfo, TeacherName, TeacherPhoto } from "./styled"

export const CardTeacher = ({ direction, name, photo, isAuthor, bio, yearsExperience }) => {
    return (
        <Card className="card-teacher" direction={direction}>
            <TeacherPhoto src={photo} alt="" />
            <TeacherInfo>
                <TeacherName>{`${name}${isAuthor ? '(автор курса)' : ''}`}</TeacherName>
                <TeacherBio>{bio}</TeacherBio>
                <Badges>
                    <Badge className="badge">Java Script</Badge>
                    <Badge className="badge">Type Script</Badge>
                    <Badge className="badge">{yearsExperience} лет опыта</Badge>
                </Badges>
            </TeacherInfo>
        </Card>
    )
}