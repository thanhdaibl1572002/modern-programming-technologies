import provinces from "./provinces"

let forms = [
    [
        { id: 1, name: 'managementAgency', label: 'Cơ quan quản lý viên chức', placeholder: 'vd: UBND Quận 5, TP.HCM', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 2, name: 'staffCode', label: 'Số hiệu viên chức', placeholder: 'vd: 01.001', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 3, name: 'userUnit', label: 'Đơn vị sử dụng viên chức', placeholder: 'vd: Trường đại học Sài Gòn', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 4, name: 'birthName', label: 'Họ và tên khai sinh', placeholder: 'vd: Nguyễn Văn A', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        {
            id: 5, name: 'gender', label: 'Giới tính', type: 'radio-group', value: 'Nam',
            radios: [
                { name: 'male', label: 'Nam', value: 'Nam' },
                { name: 'female', label: 'Nữ', value: 'Nữ' },
            ]
        },
        { id: 6, name: 'dateOfBirth', label: 'Sinh ngày', type: 'date', regex: /^.+$/, error: 'Không được để trống' },
        {
            id: 7, name: 'birthPlace', label: 'Nơi sinh', type: 'select-group', error: 'Vui lòng chọn đầy đủ thông tin',
            values: [
                { name: 'ward', label: 'Chọn phường / xã', value: '', id: '' },
                { name: 'district', label: 'Chọn quận / huyện', value: '', id: '' },
                { name: 'province', label: 'Chọn tỉnh / thành phố', value: '', id: '' },
            ],
            selects: [
                [{ name: 'ward', label: 'Chọn phường / xã', value: '', id: '' }],
                [{ name: 'district', label: 'Chọn quận / huyện', value: '', id: '' }],
                [{ name: 'province', value: '', label: 'Chọn tỉnh / thành phố', id: ''}, ...provinces],
            ]
        },
        {
            id: 8, name: 'hometown', label: 'Quê quán', type: 'select-group', error: 'Vui lòng chọn đầy đủ thông tin',
            values: [
                { name: 'ward', label: 'Chọn phường / xã', value: '', id: '' },
                { name: 'district', label: 'Chọn quận / huyện', value: '', id: '' },
                { name: 'province', label: 'Chọn tỉnh / thành phố', value: '', id: '' },
            ],
            selects: [
                [{ name: 'ward', label: 'Chọn phường / xã', value: '', id: '' }],
                [{ name: 'district', label: 'Chọn quận / huyện', value: '', id: '' }],
                [{ name: 'province', value: '', label: 'Chọn tỉnh / thành phố', id: ''}, ...provinces],
            ]
        },
    ],
    [
        {
            id: 9, name: 'permanentResidence', label: 'Nơi đăng ký hộ khẩu thường trú', type: 'select-group', error: 'Không được để trống',
            textField: { placeholder: 'vd: Số 123, đường Trần Quang Khải', label: 'Số nhà, tên đường', type: 'text' },
            values: [
                { name: 'street', label: 'Số nhà, tên đường', value: '', id: '' },
                { name: 'ward', label: 'Chọn phường / xã', value: '', id: '' },
                { name: 'district', label: 'Chọn quận / huyện', value: '', id: '' },
                { name: 'province', label: 'Chọn tỉnh / thành phố', value: '', id: '' },
            ],
            selects: [
                [{ name: 'ward', label: 'Chọn phường / xã', value: '', id: '' }],
                [{ name: 'district', label: 'Chọn quận / huyện', value: '', id: '' }],
                [{ name: 'province', value: '', label: 'Chọn tỉnh / thành phố', id: ''}, ...provinces],
            ]
        },
        {
            id: 10, name: 'currentResidence', label: 'Nơi ở hiện nay', type: 'select-group', error: 'Không được để trống',
            textField: { placeholder: 'vd: Số 123, đường Trần Quang Khải', label: 'Số nhà, tên đường', type: 'text' },
            values: [
                { name: 'street', label: 'Số nhà, tên đường', value: '', id: '' },
                { name: 'ward', label: 'Chọn phường / xã', value: '', id: '' },
                { name: 'district', label: 'Chọn quận / huyện', value: '', id: '' },
                { name: 'province', label: 'Chọn tỉnh / thành phố', value: '', id: '' },
            ],
            selects: [
                [{ name: 'ward', label: 'Chọn phường / xã', value: '', id: '' }],
                [{ name: 'district', label: 'Chọn quận / huyện', value: '', id: '' }],
                [{ name: 'province', value: '', label: 'Chọn tỉnh / thành phố', id: ''}, ...provinces],
            ]
        },
        { id: 11, name: 'ethnicity', label: 'Dân tộc', placeholder: 'vd: Kinh, Khrme', type: 'text', regex: /^.+$/, error: 'Không được để trống', },
        { id: 12, name: 'religion', label: 'Tôn giáo', placeholder: 'vd: Phật Giáo, Công Giáo', type: 'text', regex: /^.+$/, error: 'Không được để trống', },
    ],
    [
        { id: 13, name: 'occupationAtRecruitment', label: 'Nghề nghiệp khi được tuyển dụng', placeholder: 'vd: Giảng viên', type: 'text', regex: /^.+$/, error: 'Không được để trống', },
        { id: 14, name: 'recruitmentDate', label: 'Ngày tuyển dụng', type: 'date', regex: /^.+$/, error: 'Không được để trống', },
        { id: 15, name: 'recruitmentAgency', label: 'Cơ quan, đơn vị tuyển dụng', placeholder: 'vd: Trường đại học Sài Gòn', type: 'text', regex: /^.+$/, error: 'Không được để trống', },
        { id: 16, name: 'currentPosition', label: 'Chức danh (chức vụ) công tác hiện tại', placeholder: 'Giảng viên', type: 'text', regex: /^.+$/, error: 'Không được để trống', },
        { id: 17, name: 'additionalPosition', label: 'Chức danh (chức vụ) kiêm nhiệm', placeholder: 'vd: Trưởng khoa CNTT', type: 'text', regex: /^.+$/, error: 'Không được để trống', },
        { id: 18, name: 'mainJobAssigned', label: 'Công việc chính được giao', placeholder: 'vd: Giảng dạy ngành kỹ thuật phần mềm', type: 'text', regex: /^.+$/, error: 'Không được để trống', },
        { id: 19, name: 'jobTitle', label: 'Chức danh nghề nghiệp viên chức', placeholder: 'vd: Tiến Sĩ, Thạc sĩ', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 20, name: 'jobCode', label: 'Mã số chức danh', placeholder: 'vd: 01.001', type: 'number', regex: /^.+$/, error: 'Không được để trống' },
        { id: 21, name: 'salaryRank', label: 'Bậc lương', placeholder: 'vd: 1 - 12', type: 'number', regex: /^.+$/, error: 'Không được để trống' },
        { id: 22, name: 'salaryCoefficient', label: 'Hệ số', placeholder: 'vd: 5.75', type: 'number', regex: /^.+$/, error: 'Không được để trống' },
    ],
    [
        { id: 23, name: 'enjoymentDate', label: 'Ngày hưởng', type: 'date', regex: /^.+$/, error: 'Không được để trống' },
        { id: 24, name: 'positionAllowance', label: 'Phụ cấp chức danh', placeholder: 'vd: 1000000', type: 'number', regex: /^.+$/, error: 'Không được để trống' },
        { id: 25, name: 'otherAllowance', label: 'Phụ cấp khác', placeholder: 'vd: 500000', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 26, name: 'educationLevel', label: 'Trình độ giáo dục phổ thông', placeholder: 'vd: Tốt nghiệp cấp 3', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 27, name: 'highestProfessionalLevel', label: 'Trình độ chuyên môn cao nhất', placeholder: 'vd: TSKH, TS, Th.s, cử nhân, kỹ sư, cao đẳng', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 28, name: 'politicalTheory', label: 'Lý luận chính trị', placeholder: 'vd: Cử nhân, cao cấp, trung cấp, sơ cấp', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 29, name: 'stateManagement', label: 'Quản lý nhà nước', placeholder: 'vd: Chuyên viên cao cấp, chuyên viên chính', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 30, name: 'professionalCompetence', label: 'Trình độ nghiệp vụ theo chuyên ngành', placeholder: 'vd: Giảng dạy ngành kỹ thuật phần mềm', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 31, name: 'foreignLanguage', label: 'Ngoại ngữ', placeholder: 'vd: Tiếng Anh TOEIC 990', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 32, name: 'computerSkills', label: 'Tin học', placeholder: 'vd: TS, Ths, ĐH, Kỹ năng 01 đến Kỹ năng 15', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
    ],
    [
        { id: 33, name: 'partyJoinDate', label: 'Ngày vào Đảng Cộng sản Việt Nam', type: 'date', regex: /^.+$/, error: 'Không được để trống' },
        { id: 34, name: 'officialPartyDate', label: 'Ngày chính thức vào Đảng', type: 'date', regex: /^.+$/, error: 'Không được để trống' },
        { id: 35, name: 'politicalSocialOrganization', label: 'Tham gia tổ chức  chính trị - xã hội', placeholder: 'vd: Đoàn thanh niên Cộng Sản HCM', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 36, name: 'enlistmentDate', label: 'Ngày nhập ngũ', type: 'date', regex: /^.+$/, error: 'Không được để trống' },
        { id: 37, name: 'demobilizationDate', label: 'Ngày xuất ngũ', type: 'date', regex: /^.+$/, error: 'Không được để trống' },
        { id: 38, name: 'highestMilitaryRank', label: 'Quân hàm cao nhất', placeholder: 'vd: Thượng sĩ, Đại úy', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 39, name: 'highestAward', label: 'Danh hiệu được phong tặng cao nhất', placeholder: 'vd: Anh hùng lao động, nhà giáo ưu tú', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 40, name: 'academicRank', label: 'Học hàm được phong', placeholder: 'vd: Giáo sư, Phó giáo sư', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 41, name: 'workStrength', label: 'Sở trường công tác', placeholder: 'vd: Giảng dạy, Quản lý nhân sự', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 42, name: 'commendation', label: 'Khen thưởng', placeholder: 'vd: Khen thưởng lao động tiên tiến', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
    ],
    [
        { id: 43, name: 'disciplinaryAction', label: 'Kỷ luật', placeholder: 'vd: Kỷ luật về vắng mặt', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 44, name: 'healthStatus', label: 'Tình trạng sức khoẻ', placeholder: 'vd: Sức khỏe tốt, Bị bệnh tim', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 45, name: 'height', label: 'Chiều cao', placeholder: 'vd: 170', type: 'number', regex: /^.+$/, error: 'Không được để trống' },
        { id: 46, name: 'weight', label: 'Cân nặng', placeholder: 'vd: 65', type: 'number', regex: /^.+$/, error: 'Không được để trống' },
        { id: 47, name: 'bloodType', label: 'Nhóm máu', placeholder: 'vd: A, B, AB, O', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 48, name: 'disabilityRank', label: 'Là thương binh hạng', placeholder: 'vd: Thương binh hạng 2', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 49, name: 'policyFamily', label: 'Là con gia đình chính sách', placeholder: 'vd: Con thương binh, Con liệt sĩ', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 50, name: 'identityCardNumber', label: 'Số chứng minh / căn cước', placeholder: 'vd: 025689743', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
        { id: 51, name: 'idIssueDate', label: 'Ngày cấp chứng minh / căn cước', type: 'date', regex: /^.+$/, error: 'Không được để trống' },
        { id: 52, name: 'socialInsuranceBook', label: 'Sổ BHXH', placeholder: 'vd: 1234567890', type: 'text', regex: /^.+$/, error: 'Không được để trống' },
    ],
    [
        {
            id: 53, name: 'educationalMajors', label: 'Đào tạo chuyên môn nghiệp vụ', type: 'table', error: 'Không được để trống',
            values: [['', '', '', '', '', '']],
            columns: [
                { name: 'schoolName', label: 'Tên Trường', placeholder: 'vd: ĐH Sài Gòn' },
                { name: 'major', label: 'Chuyên Ngành', placeholder: 'vd: Phần mềm' },
                { name: 'trainingStartDate', label: 'Bắt đầu', type: 'month' },
                { name: 'trainingEndDate', label: 'Kết thúc', type: 'month' },
                { name: 'trainingMethod', label: 'Hình Thức Đào Tạo', placeholder: 'vd: Chính quy' },
                { name: 'certificates', label: 'Văn bằng, chứng chỉ', placeholder: 'vd: Bằng cử nhân' },
            ],
        }
    ],
    [
        {
            id: 54, name: 'workExperience', label: 'Tóm tắt quá trình công tác', type: 'table', error: 'Không được để trống',
            values: [['', '', '']],
            columns: [
                { name: 'workStartDate', label: 'Từ ngày', type: 'date' },
                { name: 'workEndDate', label: 'Đến ngày', type: 'date' },
                { name: 'workExperiencePosition', label: 'Chức danh, chức vụ, đơn vị, bồi dưỡng chuyên môn, nghiệp vụ', placeholder: 'vd: Bộ trưởng bộ Giáo dục' },
            ],
        }
    ],
    [
        {
            id: 55, name: 'myFamily', label: 'Quan hệ gia đình', type: 'table', error: 'Không được để trống',
            values: [['', '', '', '']],
            columns: [
                { name: 'myFamilyRelationship', label: 'Mối quan hệ', placeholder: 'vd: Vợ' },
                { name: 'myFamilyFullName', label: 'Họ và tên', placeholder: 'vd: Trần Thị B' },
                { name: 'myFamilyBirthYear', label: 'Ngày sinh', type: 'date' },
                { name: 'myFamilyPersonalInfo', label: 'Quê quán, nghề nghiệp, chức danh, đơn vị công tác', placeholder: 'vd: TPHCM, giảng viên, Thạc sĩ, Đại học Sài Gòn' },
            ],
        }
    ],
    [
        {
            id: 55, name: 'spouseFamily', label: 'Quan hệ gia đình bên vợ/chồng', type: 'table', error: 'Không được để trống',
            values: [['', '', '', '']],
            columns: [
                { name: 'spouseFamilyRelationship', label: 'Mối quan hệ', placeholder: 'vd: Mẹ vợ' },
                { name: 'spouseFamilyFullName', label: 'Họ và tên', placeholder: 'vd: Trần Thị C' },
                { name: 'spouseFamilyBirthYear', label: 'Ngày sinh', type: 'date' },
                { name: 'spouseFamilyPersonalInfo', label: 'Quê quán, nghề nghiệp, chức danh, đơn vị công tác', placeholder: 'vd: TPHCM, giảng viên, Tiến sĩ, Đại học Sài Gòn' },
            ],
        }
    ],
    [
        {
            id: 55, name: 'salaryProgression', label: 'Diễn biến quá trình lương', type: 'table', error: 'Không được để trống',
            values: [['', '', '', '']],
            columns: [
                { name: 'salaryProgressionDate', label: 'Tháng/năm', type: 'month' },
                { name: 'salaryProgressionCode', label: 'Mã số', type: 'number', placeholder: 'vd: 123456' },
                { name: 'salaryProgressionLevel', label: 'Bậc lương', type: 'number', placeholder: 'vd: 5' },
                { name: 'salaryProgressionCoefficient', label: 'Hệ số lương', type: 'number', placeholder: 'vd: 3.2' },
            ],
        }
    ],
    [
        {
            id: 56, name: 'personalHistory', label: 'Đặc điểm lịch sử bản thân', placeholder: `\n- Khai rõ: bị bắt, bị tù, thời gian nào? đã khai báo cho ai, những vấn đề gì? 
        \n- Có làm việc trong chế độ cũ (cơ quan, đơn vị nào, địa điểm, chức danh, chức vụ, thời gian làm việc)?
        \n- Tham gia hoặc có quan hệ với các tổ chức chính trị, kinh tế, xã hội nào ở nước ngoài (tổ chức nào, làm gì)? 
        \n- Có thân nhân (Cha, Mẹ, Vợ, Chồng, con, anh chị em ruột) ở nước ngoài (làm gì, địa chỉ)?`, type: 'text-area', regex: /^.+$/, error: 'Không được để trống'
        },
        { id: 57, name: 'unitEvaluation', label: 'Nhận xét, đánh giá của đơn vị sử dụng viên chức', type: 'text-area', regex: /^.+$/, error: 'Không được để trống' },
    ],
    [
        { id: 58, name: 'profilePicture', label: 'Ảnh hồ sơ 4 x 6 (cm)', type: 'image', error: 'Không được để trống' }
    ]
]

forms = forms.map(fields => fields.map(field => { 
    return {...field, status: true }
}))

export default forms