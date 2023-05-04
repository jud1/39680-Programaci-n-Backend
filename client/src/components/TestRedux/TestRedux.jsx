import { useSelector } from 'react-redux'
import { selectUser } from '../../store.js'

const TestRedux = () => {

   const user = useSelector(selectUser)

   return (
      <div>
         { user.data 
            ? <div>
               {data.user.id} - {data.user.firstname} - {data.user.lastname} - {data.user.email} - {data.user.avatar}
            </div>
            : <div>Es null</div>
         }
      </div>
   )
}

export default TestRedux
