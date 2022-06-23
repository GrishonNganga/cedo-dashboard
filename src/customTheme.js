export default {
    button: {
        primary: {
            base: 'text-white bg-yellow-300 border border-transparent',
            active: 'active:bg-yellow-300 hover:bg-yellow-200 focus:ring focus:ring-yellow-300',
            disabled: 'opacity-50 cursor-not-allowed bg-yellow-200',
        },
        outline: {
            base: 'text-white bg-black border border-transparent',
            active: 'active:bg-gray-800 hover:bg-gray-800 focus:ring focus:ring-gray-800',
            disabled: 'opacity-50 cursor-not-allowed',
        }
    },
    textarea: {
        base: 'block w-full text-sm focus:outline-none dark:text-gray-300 border border-yellow-400 leading-5 rounded-md p-3 focus:border-none',
        active:
            'dark:border-gray-600 focus:ring focus:border-none focus:ring-yellow-200  dark:bg-yellow-300',
        disabled: 'cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800',
        valid:
            'border-green-600 dark:bg-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200',
        invalid:
            'border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200',
        radio:
            'text-yellow-300 border bg-gray-300 form-radio focus:border-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-0 dark:focus:ring-gray-500',
        checkbox:
            'text-yellow-300 form-checkbox focus:border-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-0 rounded dark:focus:ring-gray-300',
    },
    input: {
        base: 'block w-full text-sm focus:outline-none dark:text-gray-300 border border-yellow-400 leading-5 rounded-md p-3 focus:border-none',
        active:
            'dark:border-gray-600 focus:ring focus:ring-yellow-200 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700',
        disabled: 'cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800',
        valid:
            'border-green-600 dark:bg-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200',
        invalid:
            'border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200',
        radio:
            'text-black border border border-gray-600 bg-gray-300 form-radio focus:border-yellow-900 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-0 dark:focus:ring-gray-500',
        checkbox:
            'text-yellow-300 form-checkbox focus:border-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-0 rounded dark:focus:ring-gray-300',
    },
    modal: {
        base:
            'w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl',
        wider: 'md:w-3/4'
    },
}